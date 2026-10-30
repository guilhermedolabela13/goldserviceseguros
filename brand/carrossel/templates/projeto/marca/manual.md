# Manual visual · Gold Service Seguros

Já preenchido: a Gold tem identidade (design system v1 em `brand/`). A fonte de verdade das cores, fontes e medidas é `brand/tokens/tokens.css`; este manual diz como usar no carrossel. A galeria mostra como a identidade é aplicada.

## Essência
- O que a marca faz: assessoria de seguros B2B de Belo Horizonte (desde 2009) que conecta o corretor às seguradoras parceiras com cadastro único.
- Para quem fala: **corretores de seguros** (parceiros e potenciais parceiros). Nunca o cliente final.
- Tom de voz: consultor sênior falando com um colega. Direto, seguro, calmo.
- Como NÃO falar: exagero, promessa, juridiquês, "Dicas para...", tom de varejo ("imperdível", "aproveite").
- Regras completas de voz e compliance: `brand/esteira/voz.mjs` (valem para todo carrossel).

## Cores
Proporção 60 / 30 / 10: navy, neutros quentes, dourado.
- Fundo do slide: navy (`--navy-900` → `--navy-950`) com brilho dourado no canto superior direito. É o padrão.
- Marfim (`.post.ivory`) só para variar o ritmo, no máximo um slide por carrossel.
- Dourado só como acento: a palavra de ênfase, números, fios, botão. Sobre marfim, o dourado de texto é `--gold-900`.

## Tipografia
- Títulos: **Inter 600**, tracking -0.035em, `display xl` (116px) na capa, `l` (84px) ou `m` (64px) no miolo.
- Ênfase: **uma** expressão por título em *Fraunces itálico dourado* (`<em>` no HTML, `*asteriscos*` na copy).
- Corpo: Inter 32 a 38px. Nada abaixo de 24px num slide de 1080.
- Números grandes: Fraunces itálico dourado (`.num-grande`) ou Inter 600 em dourado metálico (`.dado-num`).

## Destaque
Só a palavra em Fraunces itálico dourado. Não somar com sublinhado, chip ou marca-texto.

## Elementos
- Card padrão: **vidro com corte 45°** no canto superior direito (`.vidro`), eco do monograma G.
- Rótulo do topo: `.eyebrow` com o pilar editorial, em caixa alta espaçada, também com o corte 45°.
- Monograma em degradê dourado no canto superior direito de todo slide.
- Botão do CTA: bloco dourado metálico com corte 45° (`.botao`).
- Assets: série 3D editorial Gold no carrossel (o corretor sem rosto, objetos foscos navy com detalhe dourado, `brand/assets/3d/`); fotos still-life noturnas com luz dourada na esteira (`brand/assets/fotos/`).
- Nunca: moldura dourada em volta do slide, contador de slides, "Deslize", selo Mito/Verdade, emoji como ilustração, cantos arredondados em cards e botões.

## Composição
- Margem lateral: 88px (`--space-11`).
- Topo: eyebrow à esquerda, monograma à direita. Base: `@goldserviceseguros` discreto à esquerda.
- Um foco por slide. Texto no terço superior quando a foto ou o card ocupa o resto.
- Slide final: CTA com monograma, título, uma linha e o botão. Wordmark embaixo.
