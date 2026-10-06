// Renderiza um post (spec JSON) em PNGs 1080 px usando o design system.
// Uso: node brand/esteira/render.mjs brand/posts/01-renovacao.json [--saida dir]

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { LAYOUTS, TEMA_PADRAO, FORMATOS } from './layouts.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const BRAND = path.resolve(AQUI, '..');
const ASSINATURA = 'Gold Service · Assessoria de Seguros';

async function carregarPlaywright() {
  const require = createRequire(import.meta.url);
  try { return require('playwright'); } catch {}
  // fallback: instalação global (npm i -g playwright)
  const { execSync } = await import('node:child_process');
  const root = execSync('npm root -g').toString().trim();
  return require(path.join(root, 'playwright'));
}

function moldura(w, h) {
  const m = 32, c = 96;
  return `<svg class="moldura" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
    <path d="M${m} ${m}H${w - m - c}L${w - m} ${m + c}V${h - m}H${m}Z"/></svg>`;
}

export function htmlSlide(spec, i) {
  const s = spec.slides[i];
  const { w, h } = FORMATOS[spec.formato_peca ?? 'feed'];
  const layout = LAYOUTS[s.layout];
  if (!layout) throw new Error(`Layout desconhecido: ${s.layout} (slide ${i + 1})`);
  const tema = s.tema ?? TEMA_PADRAO[s.layout] ?? 'ivory';
  const ctx = { i, total: spec.slides.length, tema, pilar: spec.pilar, assinatura: ASSINATURA };
  const base = pathToFileURL(BRAND + '/').href;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<base href="${base}esteira/">
<link rel="stylesheet" href="../tokens/tokens.css"><link rel="stylesheet" href="post.css">
</head><body><div class="post ${tema}${s.imagem ? ' tem-foto' : ''}" style="--w:${w}px;--h:${h}px">${moldura(w, h)}${layout(s, ctx)}</div></body></html>`;
}

export async function renderizar(spec, saida) {
  mkdirSync(saida, { recursive: true });
  const { chromium } = await carregarPlaywright();
  const browser = await chromium.launch();
  const { w, h } = FORMATOS[spec.formato_peca ?? 'feed'];
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const arquivos = [];
  for (let i = 0; i < spec.slides.length; i++) {
    const html = htmlSlide(spec, i);
    const htmlPath = path.join(saida, `.slide-${i + 1}.html`);
    writeFileSync(htmlPath, html);
    await page.goto(pathToFileURL(htmlPath).href);
    await page.evaluate(() => document.fonts.ready);
    const png = path.join(saida, `${String(i + 1).padStart(2, '0')}.png`);
    await page.locator('.post').screenshot({ path: png });
    arquivos.push(png);
    rmSync(htmlPath);
  }
  await browser.close();
  // legenda pronta para copiar
  const legenda = [spec.legenda, '', (spec.hashtags ?? []).join(' '), '', spec.rodape_legal ?? ''].join('\n').trim();
  writeFileSync(path.join(saida, 'legenda.txt'), legenda + '\n');
  return arquivos;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const arq = process.argv[2];
  if (!arq) { console.error('Uso: node render.mjs <post.json> [--saida dir]'); process.exit(1); }
  const spec = JSON.parse(readFileSync(arq, 'utf8'));
  const k = process.argv.indexOf('--saida');
  const saida = k > 0 ? process.argv[k + 1] : path.join(BRAND, 'saida', spec.id);
  const pngs = await renderizar(spec, saida);
  console.log(`✓ ${pngs.length} peça(s) em ${saida}`);
}
