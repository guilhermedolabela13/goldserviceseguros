# Gosto: carrosséis v3 (skill pura + design system Gold)

## Regras

### Nunca
- Sombra (box-shadow) em card ou imagem. (2026-11-25: "para de criar sombras escrotas que estão cortando as imagens")
- Degradê, máscara ou vinheta por cima da imagem para "fundir" o 3D com o slide. (2026-11-25)

### Sempre
- Imagem de fundo gerada inteira, do tamanho do slide, com o prompt dizendo em que faixa da imagem o texto vai ficar (zona livre). (2026-11-25: "a imagem completa de fundo deve ser gerada... oriente na geração onde a info deve ficar")
- Usar o azul (navy #061C37) como fundo em parte dos slides: capas alternam navy/marfim por post, internos alternam, CTA de carrossel sempre navy. (2026-11-25)
- Destaque do título em Fraunces itálico dourado; cards e botões com o chanfro de 45° do monograma; fundos lisos, sem radial. (design system v1)

## Diário

| Data | Peça | Onde | Pedido | Feito |
|---|---|---|---|---|
| 2026-11-25 | 19 posts (v3) | todos | "mistura com o design system, para de criar sombras... use tbm o azul no fundo" + fundo inteiro gerado com zona do texto | gerar.mjs novo; fundos 3D 1 por capa gerados no Codex (prompts em assets/fundos/prompts.json) |
