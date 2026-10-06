// Esteira de posts: assunto → referência do acervo → texto na voz Gold → PNGs no design system.
//
// Uso:
//   node brand/esteira/gerar.mjs "como acionar o sinistro do carro"
//   node brand/esteira/gerar.mjs "5 erros na renovação" --ref ref-lista-principios
//   node brand/esteira/gerar.mjs "mitos do seguro de vida" --sem-ia   (só o esqueleto, para preencher à mão)
//
// Com ANTHROPIC_API_KEY (ou `ant auth login`) o texto é escrito pelo Claude.
// Sem credencial, a esteira gera um esqueleto com instruções em cada campo.

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buscar } from './buscar.mjs';
import { renderizar } from './render.mjs';
import { LAYOUTS, CAMPOS } from './layouts.mjs';
import { VOZ, verificar } from './voz.mjs';

const BRAND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODELO = process.env.GOLD_MODELO ?? 'claude-opus-5-5';

const args = process.argv.slice(2);
const flag = (n) => { const k = args.indexOf(n); return k >= 0 ? args.splice(k, 2)[1] : undefined; };
const semIA = args.includes('--sem-ia') && args.splice(args.indexOf('--sem-ia'), 1);
const refForcada = flag('--ref');
const assunto = args.join(' ').trim();
if (!assunto) { console.error('Uso: node brand/esteira/gerar.mjs "assunto do post" [--ref id] [--sem-ia]'); process.exit(1); }

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);

// 1. Referência
const candidatos = buscar(assunto, { limite: 3 });
let escolhida = refForcada ? buscar(refForcada, { limite: 99 }).find((c) => c.id === refForcada) : candidatos[0];
if (!escolhida) { console.error(`Referência não encontrada: ${refForcada}`); process.exit(1); }
if (!refForcada && escolhida.score < 3) escolhida = buscar('dicas lista', { limite: 1 })[0]; // padrão seguro
const ref = escolhida.ref;
console.log(`\n▸ Assunto: ${assunto}`);
console.log(`▸ Referência: ${ref.id} — ${ref.nome}${ref.imagem ? ` (${ref.imagem})` : ''}`);
console.log(`  outras: ${candidatos.filter((c) => c.id !== ref.id).map((c) => `${c.id} (${c.score})`).join(', ')}`);

// 2. Texto
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['titulo', 'pilar', 'slides', 'legenda', 'hashtags'],
  properties: {
    titulo: { type: 'string' },
    pilar: { type: 'string', enum: VOZ.pilares.map((p) => p.nome) },
    slides: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['layout'],
        properties: {
          layout: { type: 'string', enum: Object.keys(LAYOUTS) },
          titulo: { type: 'string' }, subtitulo: { type: 'string' }, corpo: { type: 'string' }, nota: { type: 'string' },
          numero: { type: 'string' }, unidade: { type: 'string' }, fonte: { type: 'string' },
          afirmacao: { type: 'string' }, veredito: { type: 'string', enum: ['Mito', 'Verdade'] }, explicacao: { type: 'string' },
          texto: { type: 'string' }, autor: { type: 'string' }, cargo: { type: 'string' }, botao: { type: 'string' },
          itens: { type: 'array', items: { anyOf: [{ type: 'string' }, {
            type: 'object', additionalProperties: false, required: ['titulo'],
            properties: { titulo: { type: 'string' }, texto: { type: 'string' } } }] } },
          passos: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['titulo', 'texto'],
            properties: { titulo: { type: 'string' }, texto: { type: 'string' } } } },
          extras: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['numero', 'rotulo'],
            properties: { numero: { type: 'string' }, rotulo: { type: 'string' } } } },
          esquerda: { $ref: '#/$defs/coluna' }, direita: { $ref: '#/$defs/coluna' },
        },
      },
    },
    legenda: { type: 'string' },
    hashtags: { type: 'array', items: { type: 'string' } },
  },
  $defs: { coluna: { type: 'object', additionalProperties: false, required: ['rotulo', 'itens'],
    properties: { rotulo: { type: 'string' }, itens: { type: 'array', items: { type: 'string' } } } } },
};

function prompt() {
  return `Escreva um post de Instagram para a Gold Service Seguros sobre: "${assunto}".

Siga a ESTRUTURA desta referência do acervo (um slide por item, na mesma ordem e com o mesmo layout):
${JSON.stringify({ nome: ref.nome, objetivo: ref.objetivo, o_que_funciona: ref.o_que_funciona, estrutura: ref.estrutura }, null, 2)}

Campos de cada layout:
${JSON.stringify(CAMPOS, null, 2)}

Responda só com o JSON pedido.`;
}

async function escreverComClaude() {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic();
  const resp = await client.beta.messages.create({
    model: MODELO,
    max_tokens: 16000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: VOZ.sistema,
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: SCHEMA } },
    messages: [{ role: 'user', content: prompt() }],
  });
  if (resp.stop_reason === 'refusal') throw new Error('O modelo recusou o pedido. Reformule o assunto.');
  const texto = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  return JSON.parse(texto);
}

function esqueleto() {
  const ph = (campo, papel) => `[${campo}: ${papel}]`;
  return {
    titulo: assunto,
    pilar: VOZ.pilares[0].nome,
    slides: ref.estrutura.map((e) => {
      const s = { layout: e.layout };
      for (const [campo, tipo] of Object.entries(CAMPOS[e.layout])) {
        if (tipo.endsWith('?')) continue;
        if (campo === 'itens') s.itens = e.layout === 'checklist' ? [ph('item', e.papel), ph('item', '...'), ph('item', '...'), ph('item', '...')]
          : [1, 2, 3].map((n) => ({ titulo: ph(`item ${n}`, 'título curto'), texto: ph('texto', 'uma linha') }));
        else if (campo === 'passos') s.passos = [1, 2, 3].map((n) => ({ titulo: ph(`passo ${n}`, 'verbo + ação'), texto: ph('texto', 'uma linha') }));
        else if (campo === 'esquerda' || campo === 'direita') s[campo] = { rotulo: campo, itens: [ph('item', '...'), ph('item', '...'), ph('item', '...')] };
        else if (campo === 'veredito') s.veredito = 'Mito';
        else s[campo] = ph(campo, e.papel);
      }
      return s;
    }),
    legenda: `[legenda sobre "${assunto}": gancho na 1ª linha, 2–3 frases, chamada para salvar/enviar]`,
    hashtags: ['#corretordeseguros', '#goldserviceseguros'],
  };
}

let conteudo, origem;
if (semIA) { conteudo = esqueleto(); origem = 'esqueleto'; }
else {
  try { conteudo = await escreverComClaude(); origem = MODELO; }
  catch (e) {
    console.warn(`! Sem texto do Claude (${e.message.split('\n')[0]}). Gerando esqueleto para preencher.`);
    conteudo = esqueleto(); origem = 'esqueleto';
  }
}

// 3. Spec + checagem de voz e compliance
const id = `${new Date().toISOString().slice(0, 10)}-${slug(assunto)}`;
const spec = {
  id, ...conteudo, formato: ref.formato, referencia: ref.id, assunto, origem_texto: origem,
  rodape_legal: VOZ.rodapeLegal,
};
const avisos = verificar(spec);
mkdirSync(path.join(BRAND, 'posts'), { recursive: true });
const arqSpec = path.join(BRAND, 'posts', `${id}.json`);
writeFileSync(arqSpec, JSON.stringify(spec, null, 2) + '\n');

// 4. Render
const saida = path.join(BRAND, 'saida', id);
const pngs = await renderizar(spec, saida);
console.log(`\n✓ Texto: ${path.relative(process.cwd(), arqSpec)} (${origem})`);
console.log(`✓ ${pngs.length} peça(s): ${path.relative(process.cwd(), saida)}/`);
if (avisos.length) { console.log('\n⚠ Revisar antes de publicar:'); for (const a of avisos) console.log(`  - ${a}`); }
if (origem === 'esqueleto') console.log(`\nPreencha os campos entre [colchetes] em ${path.relative(process.cwd(), arqSpec)} e rode:\n  node brand/esteira/render.mjs ${path.relative(process.cwd(), arqSpec)}`);
