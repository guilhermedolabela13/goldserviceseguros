// Renderiza todos os slides de carrosseis-v3 em PNG (1x). Uso (de brand/): node carrosseis-v3/render.mjs [filtro]
import {readdirSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
const OUT=path.resolve('carrosseis-v3');const f=process.argv[2]||'';
const b=await chromium.launch();
for(const id of readdirSync(OUT).filter(d=>/^\d\d-/.test(d)&&d.includes(f))){
  const dir=path.join(OUT,id,'v1');
  for(const s of readdirSync(dir).filter(x=>/^slide-\d+\.html$/.test(x))){
    const p=await b.newPage({viewport:{width:1080,height:1350}});
    await p.goto(pathToFileURL(path.join(dir,s)).href);
    const [w,h]=(await p.evaluate(()=>document.body.dataset.size)).split('x').map(Number);
    await p.setViewportSize({width:w,height:h});
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
    await p.screenshot({path:path.join(dir,s.replace('.html','.png'))});await p.close();
  }
}
await b.close();console.log('ok');
