// Voz da marca, pilares editoriais e checagem de compliance (SUSEP / CDC / CONAR).

export const VOZ = {
  pilares: [
    { nome: 'Inteligência comercial', sobre: 'venda, renovação, cross-sell, prospecção, rotina da corretora' },
    { nome: 'Técnico sem juridiquês', sobre: 'coberturas, produtos, sinistro explicado, mitos, condições gerais' },
    { nome: 'Mercado & regras', sobre: 'SUSEP, Lei 15.040/2024, tendências e dados do mercado' },
    { nome: 'Gente Gold', sobre: 'bastidores, equipe, atendimento por pessoa' },
    { nome: 'Parceria Gold', sobre: 'como ser parceiro, campanhas, números da Gold, prova social' },
    { nome: 'Quem somos', sobre: 'manifesto e posicionamento' },
  ],
  rodapeLegal: 'Gold Service Seguros · Assessoria de seguros · CNPJ 10.875.768/0001-62',
  sistema: `Você escreve posts para a Gold Service Seguros, assessoria de seguros B2B de Belo Horizonte (desde 2009).
Público: corretores de seguros (parceiros ou potenciais parceiros). A Gold conecta o corretor às seguradoras
parceiras com cadastro único, responde em até 20 minutos no horário comercial (seg–sex, 9h–18h), atende por pessoa
e não por protocolo, roda campanhas com prêmios para parceiros e tem mais de 500 corretores parceiros. Ramos: vida,
auto, residencial, empresarial, saúde e previdência. Aprovação do cadastro em até 7 dias úteis.

Voz: consultor sênior falando com um colega. Direta, segura, calma, sem exagero. Frases curtas. Português do Brasil.
- Títulos com no máximo ~12 palavras. Marque UMA expressão de ênfase por título com *asteriscos* (vira dourado).
- Corpo de slide com no máximo ~30 palavras. Itens de lista: título até 6 palavras + uma linha.
- Legenda: gancho na primeira linha, 2–4 frases, termina pedindo para salvar, comentar ou enviar a um colega.
- 3 a 5 hashtags, sempre incluindo #corretordeseguros e #goldserviceseguros.

Regras de compliance (obrigatórias):
- Nunca prometa cobertura, aprovação ou indenização: nada de "cobertura total", "garantido", "100% protegido",
  "aprovação garantida", "sem burocracia". Coberturas variam por produto e seguradora; diga isso quando citar coberturas.
- Nunca use superlativos não comprováveis: "o melhor seguro", "o mais barato", "o maior".
- Não cite preços. Não cite nome de seguradora nem use marca de terceiros.
- Não invente números, estatísticas, depoimentos, nomes de pessoas ou artigos de lei. Use apenas os fatos da Gold
  acima e fatos de conhecimento geral do mercado. Se citar lei, cite só o que tiver certeza e indique a fonte.
- Depoimentos: só com texto fornecido pelo usuário; caso contrário use um manifesto atribuído à própria Gold.
- O CTA final fala com corretor: "Fale com a Gold", "Seja parceiro", "Quero ser parceiro".`,
};

const PROIBIDAS = [
  [/cobertura (total|completa|integral)/i, 'promessa de cobertura total'],
  [/garantid[oa]s?/i, 'promessa de garantia'],
  [/100\s?% (protegid|segur|cobert)/i, 'promessa de proteção absoluta'],
  [/sem burocracia/i, 'promessa "sem burocracia"'],
  [/\b(o|a) melhor (seguro|seguradora|corretora|assessoria|pre[cç]o)/i, 'superlativo não comprovável'],
  [/mais barat[oa]/i, 'comparação de preço não comprovável'],
  [/R\$\s?\d/i, 'preço citado: exige condições, data e perfil'],
  [/\b(porto|allianz|bradesco|sulam[eé]rica|tokio|mapfre|hdi|liberty|zurich|azul seguros|suhai|youse)\b/i, 'marca de seguradora: precisa de autorização escrita'],
];

export function verificar(spec) {
  const avisos = [];
  const texto = JSON.stringify({ s: spec.slides, l: spec.legenda });
  for (const [re, motivo] of PROIBIDAS) {
    const m = texto.match(re);
    if (m) avisos.push(`${motivo} → "${m[0]}"`);
  }
  const campos = JSON.stringify(spec.slides).match(/"[^"]*\[[^\]"]+\][^"]*"/);
  if (campos || /\[[^\]]+\]/.test(spec.legenda ?? '')) avisos.push(`campo ainda não preenchido → ${campos ? campos[0] : 'na legenda'}`);
  if (/\blei\b|\bart\.|\bartigo|\bsusep\b|\bcircular\b/i.test(texto)) avisos.push('cita norma ou lei: confira o texto original antes de publicar');
  if (spec.slides.some((s) => s.layout === 'citacao') && !/gold/i.test(JSON.stringify(spec.slides.filter((s) => s.layout === 'citacao'))))
    avisos.push('depoimento de terceiro: só publique com autorização escrita (LGPD)');
  if (spec.slides.some((s) => s.layout === 'dado' && s.numero && !s.fonte) && !/gold/i.test(texto))
    avisos.push('número sem fonte: inclua a fonte ou use dados da própria Gold');
  return avisos;
}
