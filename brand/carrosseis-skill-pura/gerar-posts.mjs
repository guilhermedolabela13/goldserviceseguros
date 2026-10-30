// Gera os slides de todos os posts da esteira (brand/posts/*.json) no padrão da skill /carrossel pura,
// com as cores da Gold. Uso (de brand/): node carrosseis-skill-pura/gerar-posts.mjs
import {readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync} from 'node:fs';
const OUT='carrosseis-skill-pura';
const css=`:root{
  --primaria:#061C37; --texto:#061C37; --suave:#5A6573;
  --fundo:#FAF6E8; --profundo:#EDE4CC; --destaque:#8C6A28; --ouro:#D7B05A;
  --fonte:'Inter'; --margem:80px;
}
*{box-sizing:border-box}
html,body{margin:0;overflow:hidden}
body{position:relative;font-family:var(--fonte),sans-serif;-webkit-font-smoothing:antialiased;color:var(--texto);
  background:radial-gradient(900px 700px at 80% 100%,var(--profundo),transparent 70%),var(--fundo)}
h1,h2,p{margin:0;font-weight:500}
em{font-style:normal;color:var(--destaque)}
.marca{position:absolute;left:var(--margem);top:66px;display:flex;align-items:center;gap:12px;font-size:34px;letter-spacing:-1.5px;color:var(--primaria);z-index:2}
.marca img{width:36px;height:36px}
.miolo{position:absolute;left:var(--margem);right:var(--margem);top:170px;z-index:2;display:flex;flex-direction:column;gap:34px}
.miolo.centro{justify-content:center}
.story .miolo{gap:44px}.story .titulo{font-size:96px}.story .titulo.m{font-size:88px}.story .fala{font-size:52px}.story .card{padding:48px 52px}.story .card h3{font-size:48px}.story .card p{font-size:38px}.story .num{font-size:220px}.story .apoio{font-size:38px}.story .pilha{gap:24px}.story .botao{font-size:40px;padding:30px 52px}
.denso{gap:24px}.denso .titulo.m{font-size:64px}.denso .pilha{gap:14px}.denso .card{padding:28px 40px}.denso .card h3{font-size:38px;margin-bottom:6px}.denso .card p{font-size:29px}.denso .check{padding:16px 0;font-size:34px}
.etapa{font-size:24px;font-weight:700;letter-spacing:2px;color:var(--destaque);text-transform:uppercase}
.titulo{font-size:84px;line-height:1.04;letter-spacing:-3.4px}
.titulo.m{font-size:76px;line-height:1.06;letter-spacing:-3px}
.apoio{font-size:32px;line-height:1.38;color:var(--suave)}
.nota{font-size:24px;line-height:1.4;color:var(--suave)}
.card{border-radius:32px;background:#ffffffcc;border:1px solid #fff;box-shadow:0 30px 70px #061c371f;padding:40px 46px}
.card h3{margin:0 0 10px;font-size:42px;font-weight:600;letter-spacing:-1px}
.card p{font-size:33px;line-height:1.36;color:var(--suave)}
.rot{display:block;font-size:22px;font-weight:700;letter-spacing:2px;color:var(--destaque);margin-bottom:14px;text-transform:uppercase}
.fala{font-size:44px;line-height:1.3;letter-spacing:-.6px}
.num{font-size:150px;line-height:.9;font-weight:700;letter-spacing:-6px;color:var(--destaque)}
.pilha{display:flex;flex-direction:column;gap:18px}
.linha{display:grid;grid-template-columns:72px 1fr;gap:28px;align-items:start}
.bola{width:72px;height:72px;border-radius:50%;background:var(--primaria);color:var(--ouro);display:grid;place-items:center;font-size:28px;font-weight:700}
.check{display:grid;grid-template-columns:52px 1fr;gap:24px;align-items:center;font-size:38px;line-height:1.3;padding:24px 0;border-bottom:1px solid #061c3714}
.check:last-child{border-bottom:0}
.check i{width:52px;height:52px;border-radius:50%;background:var(--ouro);display:grid;place-items:center;font-style:normal;font-size:24px;color:var(--primaria);font-weight:700}
.duas{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.duas .card.escuro{background:var(--primaria);color:#FAF6E8;border-color:var(--primaria)}
.duas .card.escuro .rot{color:var(--ouro)}
.duas ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:30px;font-size:34px;line-height:1.35}
.duas li{padding-left:28px;position:relative}.duas li::before{content:"";position:absolute;left:0;top:17px;width:10px;height:10px;border-radius:50%;background:var(--ouro)}
.extras{display:flex;gap:20px}.extras .card{flex:1;padding:28px 32px}
.extras b{display:block;font-size:52px;letter-spacing:-2px;color:var(--primaria)}
.extras span{font-size:24px;color:var(--suave)}
.selo{align-self:flex-start;font-size:24px;font-weight:700;letter-spacing:2px;padding:12px 22px;border-radius:999px;background:var(--primaria);color:var(--ouro)}
.selo.verdade{background:var(--ouro);color:var(--primaria)}
.cena{position:absolute;z-index:0;background-size:auto 100%;background-repeat:no-repeat;background-position:center bottom;mix-blend-mode:multiply;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 20%,#000 80%,transparent),linear-gradient(180deg,transparent,#000 22%);-webkit-mask-composite:source-in;
  mask-image:linear-gradient(90deg,transparent,#000 20%,#000 80%,transparent),linear-gradient(180deg,transparent,#000 22%);mask-composite:intersect}
.progresso{position:absolute;left:var(--margem);bottom:64px;display:flex;gap:8px;z-index:2}
.progresso i{width:28px;height:4px;border-radius:4px;background:#0000001a}.progresso i.on{background:var(--primaria)}
.rodape{position:absolute;right:var(--margem);bottom:56px;font-size:22px;color:var(--suave);z-index:2}
body.inverte{background:radial-gradient(900px 700px at 80% 100%,#12395F,transparent 70%),var(--primaria);color:#FAF6E8}
.inverte .marca{color:#FAF6E8}.inverte em{color:var(--ouro)}.inverte .apoio,.inverte .rodape{color:#DCE3ECcc}
.inverte .progresso i{background:#ffffff26}.inverte .progresso i.on{background:var(--ouro)}
.botao{align-self:flex-start;display:inline-flex;gap:14px;align-items:center;background:var(--primaria);color:#FAF6E8;font-size:34px;font-weight:600;padding:26px 44px;border-radius:999px;margin-top:20px}
.inverte .botao{background:#FAF6E8;color:var(--primaria)}
`;
const md=s=>(s||'').replace(/\*([^*]+)\*/g,'<em>$1</em>');
const strip=s=>(s||'').replace(/\*/g,'');
const head=`<!doctype html>
<!-- Feito com a skill /carrossel pura (templates/slide-base.html), só com as cores da Gold no :root. -->
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>
${css}</style>
</head>
`;
// Imagem 4:5 (1122x1402): a caixa da cena tem a mesma proporção para a máscara cair na borda da imagem.
let RATIO=0.8;
const cena=(src,h,W)=>{const w=Math.round(h*RATIO);return `  <div class="cena" style="height:${h}px;width:${w}px;bottom:0;left:${Math.round((W-w)/2)}px;background-image:url('${src}')"></div>\n`};

function slides(post){
  const story=post.formato_peca==='story'; RATIO=story?0.5625:0.8;
  const W=1080,H=story?1920:1350, n=post.slides.length;
  const hero=`../../assets/3d/posts/${post.id}.png`;
  const temHero=existsSync(`${OUT}/assets/3d/posts/${post.id}.png`);
  return post.slides.map((s,i)=>{
    let body='',cls='',img='';
    const t=(x,c='')=>`<h1 class="titulo ${c}">${md(x)}</h1>`;
    switch(s.layout){
      case 'capa':
        body=`<span class="etapa">${post.pilar}</span>${t(s.titulo)}<p class="apoio">${md(s.subtitulo)}</p>`;
        if(temHero)img=cena(hero,story?1200:820,W);break;
      case 'texto':
        body=`${s.numero?`<span class="num">${s.numero}</span>`:''}${t(s.titulo,'m')}${s.corpo?`<div class="card"><p class="fala">${md(s.corpo)}</p></div>`:''}${s.nota?`<p class="nota">${md(s.nota)}</p>`:''}`;break;
      case 'passos':
        body=`${t(s.titulo,'m')}<div class="pilha">${s.passos.map((p,k)=>`<div class="card linha"><span class="bola">${k+1}</span><div><h3>${md(p.titulo)}</h3><p>${md(p.texto)}</p></div></div>`).join('')}</div>`;break;
      case 'lista':
        body=`${t(s.titulo,'m')}<div class="pilha">${s.itens.map((p,k)=>`<div class="card linha"><span class="bola">${k+1}</span><div><h3>${md(p.titulo)}</h3><p>${md(p.texto)}</p></div></div>`).join('')}</div>`;break;
      case 'checklist':
        body=`${t(s.titulo,'m')}<div class="card">${s.itens.map(x=>`<div class="check"><i>✓</i><span>${md(x)}</span></div>`).join('')}</div>`;break;
      case 'mito':{
        const v=(s.veredito||'').toLowerCase();
        body=`<span class="selo ${v.startsWith('verdade')?'verdade':''}">${s.veredito}</span><h1 class="titulo m">“${md(s.afirmacao)}”</h1><div class="card"><span class="rot">Na prática</span><p class="fala">${md(s.explicacao)}</p></div>`;break;}
      case 'comparativo':
        body=`${t(s.titulo,'m')}<div class="duas"><div class="card escuro"><span class="rot">${s.esquerda.rotulo}</span><ul>${s.esquerda.itens.map(x=>`<li>${md(x)}</li>`).join('')}</ul></div><div class="card"><span class="rot">${s.direita.rotulo}</span><ul>${s.direita.itens.map(x=>`<li>${md(x)}</li>`).join('')}</ul></div></div>`;break;
      case 'dado':
        body=`<span class="etapa">${post.pilar}</span><span class="num" style="font-size:200px">${s.numero}${s.unidade?`<span style="font-size:90px;letter-spacing:-3px"> ${s.unidade}</span>`:''}</span>${t(s.titulo,'m')}${s.corpo?`<p class="apoio">${md(s.corpo)}</p>`:''}${s.extras?`<div class="extras">${s.extras.map(e=>`<div class="card"><b>${e.numero}</b><span>${e.rotulo}</span></div>`).join('')}</div>`:''}`;
        if(temHero&&!s.extras)img=cena(hero,600,W);break;
      case 'citacao':
        body=`<span class="etapa">${post.pilar}</span><h1 class="titulo m">“${md(s.texto)}”</h1><p class="apoio"><b style="color:var(--texto);font-weight:600">${s.autor}</b><br>${s.cargo}</p>`;
        if(temHero)img=cena(hero,640,W);break;
      case 'cta':
        if(n>1)cls='inverte';
        body=`${t(s.titulo)}${s.corpo?`<p class="apoio">${md(s.corpo)}</p>`:''}<span class="botao">${s.botao||'Fale com a Gold'} <span>→</span></span>`;
        if(n===1&&temHero)img=cena(hero,620,W);break;
      default: throw new Error('layout '+s.layout);
    }
    const prog=n>1?`  <div class="progresso">${post.slides.map((_,k)=>`<i${k===i?' class="on"':''}></i>`).join('')}</div>\n`:'';
    const centro=!img&&s.layout!=='capa';
    const qtd=(s.itens||s.passos||[]).length;
    const denso=qtd>=(s.layout==='checklist'?6:4);
    if(story)cls=(cls+' story').trim();
    const dn=denso&&!story;
    const top=story?260:170;
    const pos=centro?`top:${top}px;bottom:${story?200:150}px`:`top:${top}px`;
    return `${head}<body${cls?` class="${cls}"`:''} data-size="${W}x${H}" style="width:${W}px;height:${H}px">
  <div class="marca"><img src="../../marca/logo.svg" alt="">Gold Service Seguros</div>
${img}  <div class="miolo${centro?' centro':''}${dn?' denso':''}" style="${pos}">${body}</div>
${prog}  <div class="rodape">@goldserviceseguros</div>
</body>
</html>
`;});
}
const lista=[];
for(const f of readdirSync('posts').filter(f=>f.endsWith('.json')).sort()){
  const post=JSON.parse(readFileSync('posts/'+f,'utf8'));
  const dir=`${OUT}/${post.id}/v1`; mkdirSync(dir,{recursive:true});
  slides(post).forEach((h,k)=>writeFileSync(`${dir}/slide-${String(k+1).padStart(2,'0')}.html`,h));
  lista.push(post);
}
// registro na galeria (formato de references/entrega.md)
const reg=JSON.parse(readFileSync(`${OUT}/carrosseis.json`,'utf8'));
const outros=reg.carousels.filter(c=>!lista.some(p=>p.id===c.id));
reg.carousels=[...outros,...lista.map(p=>({
  id:p.id,title:strip(p.titulo),description:`Post da esteira refeito 100% na skill /carrossel original, só com as cores da Gold. Pilar: ${p.pilar}.`,
  createdAt:'2026-10-30',slideCount:p.slides.length,status:'Em revisão · não publicado',
  cover:`${p.id}/v1/slide-01.png`,viewer:`${p.id}/v1/ver-carrossel.html`,
  versions:[{label:'v1 · skill pura, cores da Gold',href:`${p.id}/v1/ver-carrossel.html`}],
  caption:`${p.legenda}\n\n${(p.hashtags||[]).join(' ')}\n\n${p.rodape_legal||''}`.trim(),hashtags:p.hashtags||[],
  platforms:p.formato==='documento LinkedIn'?['LinkedIn']:['Instagram','LinkedIn']}))];
reg.updatedAt='2026-10-30';
writeFileSync(`${OUT}/carrosseis.json`,JSON.stringify(reg,null,2));
console.log(lista.length,'posts');
