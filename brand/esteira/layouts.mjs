// Layouts de post da Gold Service Seguros.
// Cada layout recebe o objeto do slide e devolve o HTML interno da peça.
// Texto aceita *ênfase* (serifa itálica dourada) e **negrito**.

import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const BRAND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const asset = (p) => readFileSync(path.join(BRAND, p), 'utf8');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const md = (s = '') => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/\n/g, '<br>');

const MONO_FLAT = asset('assets/monograma-mono.svg').replace('<svg ', '<svg class="mono" ');
const MONO_LINHA = asset('assets/monograma-contorno.svg').replace('<svg ', '<svg class="mono" ');
const WORDMARK = asset('assets/wordmark.svg').replace('<svg ', '<svg class="wordmark" ');
let gid = 0; // o monograma em degradê precisa de id único por uso
const MONO = () => asset('assets/monograma.svg').replace('<svg ', '<svg class="mono" ')
  .replaceAll('id="g"', `id="g${++gid}"`).replaceAll('url(#g)', `url(#g${gid})`);

export const FORMATOS = {
  feed: { w: 1080, h: 1350 },   // 4:5 — padrão Instagram/LinkedIn
  quadrado: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },  // stories e capa de reels
};

// imagem de fundo: caminho relativo a brand/ ou URL
export const foto = (s) => s.imagem
  ? `<div class="foto" style="background-image:url('${/^https?:/.test(s.imagem) ? s.imagem : pathToFileURL(path.join(BRAND, s.imagem)).href}')"></div>` : '';

// ── Peças comuns (topo e rodapé) ───────────────────────────────────────────
const topo = (s, ctx) => `
  <header class="topo">
    <span class="eyebrow">${esc(s.eyebrow ?? ctx.pilar ?? '')}</span>
    ${ctx.tema === 'navy' ? MONO() : MONO_FLAT}
  </header>`;

const rodape = (ctx) => `
  <footer class="rodape">
    <span>@goldserviceseguros</span>
  </footer>`;

// ── Layouts ───────────────────────────────────────────────────────────
export const LAYOUTS = {
  capa: (s, ctx) => `
    ${foto(s)}<div class="marca-dagua">${MONO_LINHA}</div>
    ${topo(s, ctx)}
    <div class="capa-corpo">
      ${s.numero ? `<div class="capa-num">${esc(s.numero)}</div>` : ''}
      <h1 class="display xl">${md(s.titulo)}</h1>
      ${s.subtitulo ? `<p class="lead">${md(s.subtitulo)}</p>` : ''}
    </div>
    ${rodape(ctx)}`,

  texto: (s, ctx) => `
    ${foto(s)}${topo(s, ctx)}
    <div class="miolo">
      ${s.numero ? `<div class="num-grande">${esc(s.numero)}</div>` : ''}
      <h2 class="display l">${md(s.titulo)}</h2>
      <div class="fio"></div>
      <p class="corpo">${md(s.corpo)}</p>
      ${s.nota ? `<p class="nota">${md(s.nota)}</p>` : ''}
    </div>
    ${rodape(ctx)}`,

  lista: (s, ctx) => `
    ${topo(s, ctx)}
    <div class="miolo">
      <h2 class="display m">${md(s.titulo)}</h2>
      <ol class="lista">
        ${s.itens.map((it, k) => `<li class="vidro">
          <div><strong>${md(it.titulo)}</strong>${it.texto ? `<p>${md(it.texto)}</p>` : ''}</div>
          <span class="li-n">${String(k + 1).padStart(2, '0')}</span></li>`).join('')}
      </ol>
    </div>
    ${rodape(ctx)}`,

  passos: (s, ctx) => `
    ${topo(s, ctx)}
    <div class="miolo">
      <h2 class="display m">${md(s.titulo)}</h2>
      <div class="passos">
        ${s.passos.map((p, k) => `<div class="passo vidro"><div class="passo-n">${k + 1}</div>
          <div><strong>${md(p.titulo)}</strong>${p.texto ? `<p>${md(p.texto)}</p>` : ''}</div></div>`).join('')}
      </div>
    </div>
    ${rodape(ctx)}`,

  dado: (s, ctx) => `
    ${foto(s)}${topo(s, ctx)}
    <div class="miolo centro-v">
      <div class="dado-num">${esc(s.numero)}<span>${esc(s.unidade ?? '')}</span></div>
      <h2 class="display m">${md(s.titulo)}</h2>
      ${s.corpo ? `<p class="corpo" style="margin-top:24px">${md(s.corpo)}</p>` : ''}
      ${s.extras ? `<div class="dado-extra">${s.extras.map((x) => `<div class="vidro"><b>${esc(x.numero)}</b><span>${esc(x.rotulo)}</span></div>`).join('')}</div>` : ''}
      ${s.fonte ? `<p class="fonte">Fonte: ${md(s.fonte)}</p>` : ''}
    </div>
    ${rodape(ctx)}`,

  mito: (s, ctx) => `
    ${topo(s, ctx)}
    <div class="miolo">
      <h2 class="display l afirmacao">“${md(s.afirmacao)}”</h2>
      <div class="cartao vidro"><p class="corpo">${md(s.explicacao)}</p></div>
    </div>
    ${rodape(ctx)}`,

  checklist: (s, ctx) => `
    ${topo(s, ctx)}
    <div class="miolo">
      <h2 class="display m">${md(s.titulo)}</h2>
      <ul class="check">${s.itens.map((t) => `<li class="vidro"><span class="box"></span><span>${md(t)}</span></li>`).join('')}</ul>
    </div>
    ${rodape(ctx)}`,

  comparativo: (s, ctx) => `
    ${topo(s, ctx)}
    <div class="miolo">
      <h2 class="display m">${md(s.titulo)}</h2>
      <div class="comp">
        ${['esquerda', 'direita'].map((lado) => `<div class="comp-col vidro ${lado}">
          <div class="comp-rot">${esc(s[lado].rotulo)}</div>
          <ul>${s[lado].itens.map((t) => `<li>${md(t)}</li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
    ${rodape(ctx)}`,

  citacao: (s, ctx) => `
    <div class="aspas">“</div>
    ${topo(s, ctx)}
    <div class="miolo centro-v">
      <div class="cit vidro">
        <blockquote>${md(s.texto)}</blockquote>
        <div class="fio"></div>
        <p class="autor"><strong>${esc(s.autor)}</strong>${s.cargo ? `<br>${esc(s.cargo)}` : ''}</p>
      </div>
    </div>
    ${rodape(ctx)}`,

  cta: (s, ctx) => `
    ${foto(s)}<div class="cta">
      ${MONO()}
      <h2 class="display l">${md(s.titulo)}</h2>
      ${s.corpo ? `<p class="lead">${md(s.corpo)}</p>` : ''}
      ${s.botao ? `<div class="botao">${esc(s.botao)}</div>` : ''}
      <div class="cta-assina">${WORDMARK}</div>
    </div>`,
};

// Tema padrão: navy (como nas referências). "ivory" fica para variar o ritmo.
export const TEMA_PADRAO = Object.fromEntries(Object.keys(LAYOUTS).map((k) => [k, 'navy']));

// Campos de cada layout (usados pela esteira para pedir/validar o texto)
export const CAMPOS = {
  capa: { titulo: 'string', subtitulo: 'string?', eyebrow: 'string?', imagem: 'string?' },
  texto: { titulo: 'string', corpo: 'string', numero: 'string?', nota: 'string?' },
  lista: { titulo: 'string', itens: '[{titulo, texto?}] 3–4' },
  passos: { titulo: 'string', passos: '[{titulo, texto}] 3–4' },
  dado: { numero: 'string', unidade: 'string?', titulo: 'string', corpo: 'string?', extras: '[{numero, rotulo}]?', fonte: 'string?' },
  mito: { afirmacao: 'string', veredito: 'Mito|Verdade', explicacao: 'string' },
  checklist: { titulo: 'string', itens: 'string[] 4–5' },
  comparativo: { titulo: 'string', esquerda: '{rotulo, itens[3]}', direita: '{rotulo, itens[3]}' },
  citacao: { texto: 'string', autor: 'string', cargo: 'string?' },
  cta: { titulo: 'string', corpo: 'string?', botao: 'string?' },
};
