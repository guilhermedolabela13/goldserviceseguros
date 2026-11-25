// Carrosséis v3: estrutura e copy da versão "skill pura" + design system v1 da Gold (tokens, Fraunces no destaque,
// chanfro do monograma, navy). Sem sombras e sem degradês por cima das imagens: a capa usa um fundo 3D gerado inteiro
// (assets/fundos/NN.png), que já deixa livre a área do texto. Uso (de brand/): node carrosseis-v3/gerar.mjs
import {readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync} from 'node:fs';
const OUT='carrosseis-v3';
const css=`@font-face{font-family:"Inter";src:url("../../../fonts/Inter.woff2") format("woff2");font-weight:300 800}
@font-face{font-family:"Fraunces";src:url("../../../fonts/Fraunces-Italic.woff2") format("woff2");font-weight:300 700;font-style:italic}
:root{--navy:#061C37;--navy8:#0A2A4A;--navy7:#12395F;--ivory:#FAF6E8;--sand:#EDE4CC;--slate:#5A6573;
  --g9:#8C6A28;--g5:#D7B05A;--g1:#F8D077;--m:80px;--ch:44px}
*{box-sizing:border-box}html,body{margin:0;overflow:hidden}
body{position:relative;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;background:var(--ivory);color:var(--navy);
  --tx:var(--navy);--sv:var(--slate);--em:var(--g9);--card:#fff;--fio:rgba(6,28,55,.14);--bola:var(--navy);--bolat:var(--g1)}
body.navy{background:var(--navy);color:var(--ivory);--tx:var(--ivory);--sv:#DCE3ECcc;--em:var(--g1);--card:var(--navy8);--fio:rgba(248,208,119,.28);--bola:var(--g5);--bolat:var(--navy)}
body.foto{background-size:cover}
h1,h2,h3,p{margin:0}
em{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:500;color:var(--em);letter-spacing:-.01em}
.topo{position:absolute;left:var(--m);right:var(--m);top:64px;display:flex;align-items:center;justify-content:space-between;z-index:2}
.topo .eb{font-size:21px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--em)}
.topo img{width:46px;height:46px}
.miolo{position:absolute;left:var(--m);right:var(--m);z-index:2;display:flex;flex-direction:column;gap:32px}
.miolo.centro{justify-content:center}
.titulo{font-size:86px;line-height:1.04;font-weight:600;letter-spacing:-.035em;color:var(--tx)}
.titulo em{font-size:1.06em}
.titulo.m{font-size:72px}
.apoio{font-size:32px;line-height:1.4;color:var(--sv)}
.nota{font-size:24px;line-height:1.4;color:var(--sv)}
.fio{width:120px;height:2px;background:var(--g5)}
.card{background:var(--card);padding:40px 46px;clip-path:polygon(0 0,calc(100% - var(--ch)) 0,100% var(--ch),100% 100%,0 100%)}
.card h3{margin:0 0 10px;font-size:40px;font-weight:600;letter-spacing:-.02em;color:var(--tx)}
.card p{font-size:31px;line-height:1.38;color:var(--sv)}
.rot{display:block;font-size:20px;font-weight:600;letter-spacing:.24em;color:var(--em);margin-bottom:16px;text-transform:uppercase}
.fala{font-size:42px!important;line-height:1.32!important;letter-spacing:-.01em;color:var(--tx)!important}
.num{font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:500;font-size:150px;line-height:.9;color:var(--em);letter-spacing:-.02em}
.pilha{display:flex;flex-direction:column;gap:16px}
.linha{display:grid;grid-template-columns:72px 1fr;gap:28px;align-items:start}
.bola{width:72px;height:72px;background:var(--bola);color:var(--bolat);display:grid;place-items:center;font-size:30px;font-weight:700;
  clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%)}
.check{display:grid;grid-template-columns:52px 1fr;gap:24px;align-items:center;font-size:36px;line-height:1.3;padding:22px 0;border-bottom:2px solid var(--fio);color:var(--tx)}
.check:last-child{border-bottom:0}
.check i{width:52px;height:52px;background:var(--g5);display:grid;place-items:center;font-style:normal;font-size:24px;color:var(--navy);font-weight:700;
  clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)}
.duas{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.duas .card.inv{background:var(--navy)}.navy .duas .card.inv{background:var(--ivory)}
.duas .card.inv li{color:var(--ivory)}.navy .duas .card.inv li{color:var(--navy)}
.duas .card.inv .rot{color:var(--g1)}.navy .duas .card.inv .rot{color:var(--g9)}
.duas ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:28px;font-size:32px;line-height:1.35;color:var(--tx)}
.duas li{padding-left:28px;position:relative}.duas li::before{content:"";position:absolute;left:0;top:15px;width:12px;height:12px;background:var(--g5)}
.extras{display:flex;gap:16px}.extras .card{flex:1;padding:26px 30px;--ch:24px}
.extras b{display:block;white-space:nowrap;font-size:50px;font-weight:600;letter-spacing:-.03em;color:var(--tx)}
.extras span{font-size:23px;color:var(--sv)}.foto .extras b{font-size:40px}.foto .extras .card{padding:24px 26px}
.selo{align-self:flex-start;font-size:22px;font-weight:600;letter-spacing:.24em;padding:14px 24px;background:var(--navy);color:var(--g1);text-transform:uppercase}
.navy .selo{background:var(--ivory);color:var(--navy)}
.selo.verdade{background:var(--g5);color:var(--navy)}
.botao{align-self:flex-start;display:inline-flex;gap:14px;align-items:center;background:var(--g5);color:var(--navy);font-size:32px;font-weight:600;padding:26px 44px;margin-top:12px;
  clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%)}
.progresso{position:absolute;left:var(--m);bottom:64px;display:flex;gap:8px;z-index:2}
.progresso i{width:28px;height:4px;background:rgba(6,28,55,.14)}.progresso i.on{background:var(--navy)}
.navy .progresso i{background:rgba(255,255,255,.18)}.navy .progresso i.on{background:var(--g5)}
.rodape{position:absolute;right:var(--m);bottom:56px;font-size:22px;color:var(--sv);z-index:2}
.wordmark{position:absolute;left:var(--m);bottom:120px;width:280px;color:var(--g5)}.wordmark svg{width:100%;height:auto;display:block}
.story .titulo{font-size:96px}.story .titulo.m{font-size:84px}.story .fala{font-size:50px!important}.story .card h3{font-size:46px}.story .card p{font-size:36px}
.story .apoio{font-size:38px}.story .num{font-size:220px}.story .botao{font-size:40px;padding:30px 52px}.story .miolo{gap:42px}
.denso{gap:22px}.denso .titulo.m{font-size:62px}.denso .pilha{gap:12px}.denso .card{padding:26px 40px}.denso .card h3{font-size:36px;margin-bottom:4px}.denso .card p{font-size:28px}.denso .check{padding:14px 0;font-size:32px}
`;
const md=s=>(s||'').replace(/\*([^*]+)\*/g,'<em>$1</em>');
const strip=s=>(s||'').replace(/\*/g,'');
const head=`<!doctype html>
<!-- Carrossel v3: skill pura + design system Gold. Sem sombras; fundo da capa gerado inteiro. -->
<html lang="pt-BR"><head><meta charset="utf-8"><style>
${css}</style></head>
`;
const WM=readFileSync('assets/wordmark.svg','utf8').replace(/<\?xml[^>]*>/,'');
// deslocamento vertical do fundo (px) por imagem, para a cena não encostar no rodapé nem subir no texto
const DESLOC=existsSync(`${OUT}/assets/fundos/desloc.json`)?JSON.parse(readFileSync(`${OUT}/assets/fundos/desloc.json`,'utf8')):{};
const lista=[];
const ordem=readdirSync('posts').filter(f=>f.endsWith('.json')).sort();
function slides(post){
  const story=post.formato_peca==='story';
  const W=1080,H=story?1920:1350,n=post.slides.length;
  const nn=post.id.slice(0,2);
  const fundo=existsSync(`${OUT}/assets/fundos/${nn}.jpg`)?`../../assets/fundos/${nn}.jpg`:null;
  const corCapa=Number(nn)%2?'navy':'claro';
  return post.slides.map((s,i)=>{
    let body='',topo='',cls;
    // cor: a peça com imagem segue a cor do fundo gerado; os slides internos alternam; o CTA de carrossel é sempre navy
    if(i===0)cls=corCapa;
    else cls=(i%2===1)===(corCapa==='navy')?'claro':'navy';
    if(s.layout==='cta'&&n>1)cls='navy';
    const comFoto=i===0&&fundo;
    const t=(x,c='')=>`<h1 class="titulo ${c}">${md(x)}</h1>`;
    switch(s.layout){
      case 'capa':body=`${t(s.titulo)}<div class="fio"></div><p class="apoio">${md(s.subtitulo)}</p>`;break;
      case 'texto':body=`${s.numero?`<span class="num">${s.numero}</span>`:''}${t(s.titulo,'m')}${s.corpo?`<div class="card"><p class="fala">${md(s.corpo)}</p></div>`:''}${s.nota?`<p class="nota">${md(s.nota)}</p>`:''}`;break;
      case 'passos':case 'lista':{const it=s.passos||s.itens;
        body=`${t(s.titulo,'m')}<div class="pilha">${it.map((p,k)=>`<div class="card linha"><span class="bola">${k+1}</span><div><h3>${md(p.titulo)}</h3><p>${md(p.texto)}</p></div></div>`).join('')}</div>`;break;}
      case 'checklist':body=`${t(s.titulo,'m')}<div class="card">${s.itens.map(x=>`<div class="check"><i>✓</i><span>${md(x)}</span></div>`).join('')}</div>`;break;
      case 'mito':{const v=(s.veredito||'').toLowerCase();
        body=`<span class="selo ${v.startsWith('verdade')?'verdade':''}">${s.veredito}</span><h1 class="titulo m">“${md(s.afirmacao)}”</h1><div class="card"><span class="rot">Na prática</span><p class="fala">${md(s.explicacao)}</p></div>`;break;}
      case 'comparativo':body=`${t(s.titulo,'m')}<div class="duas"><div class="card inv"><span class="rot">${s.esquerda.rotulo}</span><ul>${s.esquerda.itens.map(x=>`<li>${md(x)}</li>`).join('')}</ul></div><div class="card"><span class="rot">${s.direita.rotulo}</span><ul>${s.direita.itens.map(x=>`<li>${md(x)}</li>`).join('')}</ul></div></div>`;break;
      case 'dado':body=`<span class="num" style="font-size:210px">${s.numero}${s.unidade?`<span style="font-size:96px"> ${s.unidade}</span>`:''}</span>${t(s.titulo,'m')}${s.corpo?`<p class="apoio">${md(s.corpo)}</p>`:''}${s.extras?`<div class="extras" style="width:${comFoto?'62%':'100%'}">${s.extras.map(e=>`<div class="card"><b>${e.numero}</b><span>${e.rotulo}</span></div>`).join('')}</div>`:''}`;break;
      case 'citacao':body=`${t('“'+s.texto+'”','m')}<div class="fio"></div><p class="apoio"><b style="color:var(--tx);font-weight:600">${s.autor}</b><br>${s.cargo}</p>`;break;
      case 'cta':body=`${t(s.titulo)}${s.corpo?`<p class="apoio">${md(s.corpo)}</p>`:''}<span class="botao">${s.botao||'Fale com a Gold'} <span>→</span></span>`;break;
      default:throw new Error('layout '+s.layout);
    }
    if(comFoto&&s.layout==='cta')cls='claro';
    const prog=n>1?`  <div class="progresso">${post.slides.map((_,k)=>`<i${k===i?' class="on"':''}></i>`).join('')}</div>\n`:'';
    const qtd=(s.itens||s.passos||[]).length;
    const denso=!story&&qtd>=(s.layout==='checklist'?6:4);
    const topY=story?(comFoto?190:250):160;
    const centro=!comFoto;
    const pos=centro?`top:${topY}px;bottom:${story?190:140}px`:`top:${topY}px`;
    const logo=cls==='navy'?'monograma.svg':'monograma-navy.svg';
    const classes=[cls,comFoto?'foto':'',story?'story':''].filter(Boolean).join(' ');
    const bg=comFoto?` background-image:url('${fundo}');background-position:center ${story?'top;background-size:auto 2040px':'-70px'};`:'';
    // Posição do fundo: sobe a imagem para a cena sair de cima do rodapé, mas nunca a ponto de encostar no texto.
    const ajuste=comFoto&&!story&&DESLOC[nn]?`<script>(()=>{const[t,b]=${JSON.stringify(DESLOC[nn])};const m=document.querySelector('.miolo').getBoundingClientRect().bottom;
const d=Math.max(0,Math.min(270,b-1250,t-(m+36)));document.body.style.backgroundPosition='center -'+d+'px'})()</script>\n`:'';
    const wm=s.layout==='cta'&&!comFoto&&cls==='navy'&&!story?`  <div class="wordmark">${WM}</div>\n`:'';
    return `${head}<body class="${classes}" data-size="${W}x${H}" style="width:${W}px;height:${H}px;${bg}">
  <div class="topo"><span class="eb">${post.pilar}</span><img src="../../assets/${logo}" alt=""></div>
  <div class="miolo${centro?' centro':''}${denso?' denso':''}" style="${pos}">${body}</div>
${wm}${prog}${comFoto?'':'  <div class="rodape">@goldserviceseguros</div>\n'}${ajuste}
</body></html>
`;});
}
for(const f of ordem){
  const post=JSON.parse(readFileSync('posts/'+f,'utf8'));
  const dir=`${OUT}/${post.id}/v1`;mkdirSync(dir,{recursive:true});
  slides(post).forEach((h,k)=>writeFileSync(`${dir}/slide-${String(k+1).padStart(2,'0')}.html`,h));
  lista.push(post);
}
writeFileSync(`${OUT}/lista.json`,JSON.stringify(lista.map(p=>({id:p.id,titulo:strip(p.titulo),slides:p.slides.length,story:p.formato_peca==='story'})),null,1));
console.log(lista.length,'posts');
