// Busca no acervo a referência que melhor casa com um assunto (BM25 + sinônimos).
// Uso: node brand/esteira/buscar.mjs "como acionar o sinistro de auto"

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BRAND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const STOP = new Set(('a o as os um uma uns umas de do da dos das em no na nos nas por para pra com sem ' +
  'que e ou se ao aos à às é ser seu sua seus suas meu minha nosso nossa como mais menos muito ' +
  'sobre post posts fazer falar quero criar um tem ter já não sim isso este esta esse essa ' +
  'seguro seguros corretor corretores corretora cliente clientes').split(' '));

// termos que indicam a FORMA do post pesam mais que o tema (o acervo é de estruturas)
const FORMA = new Set(['mito', 'dica', 'comparar', 'depoimento', 'pergunta', 'processo', 'checklist', 'campanha', 'numero', 'renovacao'].map((t) => t));

// grupos de sinônimos do mercado de seguros (o primeiro termo é o canônico)
const SINONIMOS = [
  ['auto', 'carro', 'veiculo', 'automovel', 'moto', 'frota', 'colisao', 'roubo'],
  ['residencial', 'casa', 'apartamento', 'imovel', 'lar', 'condominio', 'inquilino', 'aluguel'],
  ['vida', 'familia', 'falecimento', 'invalidez', 'doenca'],
  ['sinistro', 'acionar', 'indenizacao', 'acidente', 'vistoria', 'regulacao'],
  ['renovacao', 'vencimento', 'renovar', 'retencao'],
  ['dica', 'dicas', 'erro', 'erros', 'ponto', 'pontos', 'lista'],
  ['mito', 'verdade', 'objecao', 'crenca', 'engano'],
  ['lei', 'regra', 'susep', 'norma', 'regulacao', 'legislacao', 'mudanca'],
  ['parceiro', 'parceria', 'cadastro', 'credenciamento'],
  ['atendimento', 'suporte', 'resposta', 'whatsapp', 'agilidade'],
  ['depoimento', 'avaliacao', 'testemunho', 'prova'],
  ['comparar', 'comparacao', 'diferenca', 'versus', 'escolher'],
  ['venda', 'vender', 'vendas', 'prospeccao', 'crosssell', 'oferecer', 'comercial'],
  ['campanha', 'sazonal', 'ferias', 'viagem', 'chuva', 'enchente', 'natal', 'carnaval'],
  ['empresarial', 'empresa', 'negocio', 'pme', 'comercio'],
  ['numero', 'numeros', 'dados', 'percentual', 'estatistica', 'resultado'],
];

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ');
const raiz = (t) => t.length > 4 ? t.replace(/(coes|cao|mente|oes|ais|eis|res|es|s)$/, '') : t;

const MAPA = new Map();
for (const g of SINONIMOS) for (const t of g) MAPA.set(raiz(t), raiz(g[0]));

export function tokens(texto, expandir = false) {
  const out = [];
  for (const t of norm(texto).split(/\s+/)) {
    if (!t || STOP.has(t)) continue;
    const r = raiz(t);
    out.push(r);
    if (expandir && MAPA.has(r) && MAPA.get(r) !== r) out.push(MAPA.get(r));
  }
  return out;
}

export function carregarAcervo() {
  return JSON.parse(readFileSync(path.join(BRAND, 'acervo/referencias.json'), 'utf8')).referencias;
}

// Texto indexado de cada referência; palavras-chave pesam 3x.
function documento(ref) {
  const kw = ref.palavras_chave.join(' ');
  const base = [ref.nome, ref.objetivo, ref.o_que_funciona, ref.estrutura.map((e) => e.papel).join(' ')].join(' ');
  return [...tokens(`${kw} ${kw} ${kw}`, true), ...tokens(base, true)];
}

export function buscar(assunto, { limite = 3, acervo = carregarAcervo() } = {}) {
  const docs = acervo.map((r) => ({ ref: r, toks: documento(r) }));
  const N = docs.length, avg = docs.reduce((a, d) => a + d.toks.length, 0) / N;
  const df = new Map();
  for (const d of docs) for (const t of new Set(d.toks)) df.set(t, (df.get(t) ?? 0) + 1);
  const extra = [];
  if (/^\s*e se\b|\?\s*$/i.test(assunto)) extra.push('pergunta');
  if (/^\s*(como|passo)\b/i.test(assunto)) extra.push('processo');
  if (/\b\d+\s+(dicas|erros|pontos|passos|coisas|motivos)/i.test(norm(assunto))) extra.push('dica');
  const q = [...new Set([...tokens(assunto, true), ...extra.map(raiz)])];
  const k1 = 1.4, b = 0.75;
  return docs.map((d) => {
    let score = 0; const bateu = [];
    for (const t of q) {
      const f = d.toks.filter((x) => x === t).length;
      if (!f) continue;
      const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
      const peso = FORMA.has(t) ? 2 : 1;
      score += peso * idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.toks.length / avg));
      bateu.push(t);
    }
    return { id: d.ref.id, nome: d.ref.nome, score: +score.toFixed(2), bateu, ref: d.ref };
  }).sort((a, b) => b.score - a.score).slice(0, limite);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const assunto = process.argv.slice(2).join(' ');
  if (!assunto) { console.error('Uso: node buscar.mjs "assunto do post"'); process.exit(1); }
  for (const r of buscar(assunto)) console.log(`${r.score.toFixed(2).padStart(6)}  ${r.id}  (${r.nome})  ← ${r.bateu.join(', ')}`);
}
