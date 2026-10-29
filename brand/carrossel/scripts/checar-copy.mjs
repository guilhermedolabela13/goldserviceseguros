// Roda a checagem de compliance da esteira (esteira/voz.mjs) no texto dos slides e na legenda registrada.
// Uso: node checar-copy.mjs <id>/<versão> [--dir carrosseis]   ex.: node checar-copy.mjs cotacao-sem-resposta/v1
import {readdir,readFile} from 'node:fs/promises';
import path from 'node:path';
import {dir,args,skillRoot} from './brand.mjs';
const {verificar}=await import(path.join(skillRoot,'../esteira/voz.mjs'));
const target=args[0];
if(!target)throw new Error('Informe a pasta da versão: node checar-copy.mjs <id>/<versão>');
const folder=path.join(dir,target);
const files=(await readdir(folder)).filter(f=>/^slide-\d+\.html$/.test(f)).sort();
const texto=html=>html.replace(/<!--[\s\S]*?-->/g,'').replace(/<(style|script)[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const slides=await Promise.all(files.map(async f=>({layout:'texto',texto:texto(await readFile(path.join(folder,f),'utf8'))})));
const registry=JSON.parse(await readFile(path.join(dir,'carrosseis.json'),'utf8'));
const item=registry.carousels.find(c=>c.id===target.split('/')[0]);
const avisos=verificar({slides,legenda:item?.caption??''});
if(!item)avisos.push('carrossel ainda não registrado em carrosseis.json: legenda não checada');
else if(!/CNPJ 10\.875\.768\/0001-62/.test(item.caption))avisos.push('legenda sem o rodapé legal (Assessoria de seguros · CNPJ)');
console.log(avisos.length?'Avisos:\n- '+avisos.join('\n- '):'Checagem ok: nenhum aviso.');
