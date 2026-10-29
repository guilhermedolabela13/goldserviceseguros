---
name: carrossel-gold
description: Cria carrosséis e posts estáticos da Gold Service Seguros (Instagram, LinkedIn) no design system da marca, do roteiro ao PNG em 2x, com galeria, slider, comparação de versões e legenda com rodapé legal. Use quando pedirem carrossel, post, capa ou slide da Gold para redes sociais.
---

# /carrossel · edição Gold

Versão da skill [/carrossel](https://github.com/guilhermealvestech/carrossel-skill) com o design system da Gold Service Seguros já aplicado. O processo é o da skill original (**roteiro antes do visual**, **a galeria como referência**, **assets próprios**, **checagem visual de cada render**, **gosto acumulado**); a identidade, a voz e as regras de compliance vêm de `brand/`. Siga a ordem abaixo; não pule etapas.

Caminhos: `<skill>` é a pasta deste arquivo (`brand/carrossel`). Rode os scripts de dentro de `brand/`; o projeto de carrosséis fica em `brand/carrosseis/` (padrão `--dir carrosseis`).

| Vem da Gold (`brand/`) | Vem da skill original |
|---|---|
| `tokens/tokens.css`, fontes, monograma, fotos | roteiro em texto antes de desenhar |
| `esteira/post.css` (vidro 45°, eyebrow, display, botão) | slides em HTML editável, PNG 1x e 2x |
| `esteira/voz.mjs` (voz B2B e compliance) | slider, galeria, comparação de versões, ZIP |
| público: corretores parceiros | `GOSTO.md` como memória de aprovações e recusas |

## 0. Primeira vez

1. `node carrossel/scripts/checar-setup.mjs`. Se faltar algo: `npm install --prefix carrossel` e `npx --prefix carrossel playwright install chromium`.
2. Se `carrosseis/marca/marca.json` não existe: `node carrossel/scripts/novo-projeto.mjs`. **Não há onboarding de marca**: o projeto já nasce com `marca.json`, `manual.md`, `GOSTO.md` e o manifesto das fotos da Gold.

## 1. Antes de qualquer peça: ler

Sempre, nesta ordem: `carrosseis/GOSTO.md`, `carrosseis/marca/manual.md`, `esteira/voz.mjs` (constante `VOZ.sistema`), `carrosseis/carrosseis.json` e `carrosseis/assets/*/manifest.json`.

Ao sugerir temas, confira a galeria **e** `posts/` (os posts da esteira) para não repetir assunto. Use os pilares de `VOZ.pilares` como eyebrow.

## 2. Roteiro primeiro

Siga `references/roteiro.md`. Entregue **só texto**: um bloco por slide, de 4 a 7 slides, capa com 2 ou 3 opções, legenda e o resultado da checagem de compliance. **Não desenhe nada até o roteiro ser aprovado.**

## 3. Visual

Siga `references/visual.md`. Resumo:
- Parta das peças aprovadas na galeria e dos PNGs em `saida/`, não de um layout novo a cada vez.
- Use `templates/slide-base.html` como esqueleto. Ele já carrega tokens, fontes, `post.css` e `templates/carrossel.css`: **não reescreva cores nem fontes à mão**, use as classes e variáveis.
- Um foco por slide. Foto ou card grande, integrado à composição.
- Se nenhuma foto de `brand/assets/fotos/` servir, **não invente nem gere sozinho**: diga qual falta e entregue o prompt pronto (`references/image-gen.md`) para gerar no Codex.
- Nunca numere slides, nunca "Deslize", nunca moldura dourada (ver `GOSTO.md`).

## 4. Render e checagem

1. Salve cada slide em `carrosseis/<id>/v<N>/slide-NN.html` (os caminhos `../../../` apontam para `brand/`).
2. De `brand/`: `node carrossel/scripts/render.mjs <id>/v<N>` gera `slide-NN.png` (1080×1350) e `slide-NN-2x.png` (2160×2700).
3. **Abra e olhe cada PNG** antes de entregar: texto cortado, sobreposição, texto colado na borda, contraste, foto escura demais, ênfase em mais de uma expressão. Corrija e renderize de novo.

## 5. Entrega

Siga `references/entrega.md`: registrar em `carrosseis.json` (legenda já com o rodapé legal), gerar o slider e a galeria e mostrar o resultado.

## 6. Feedback vira gosto

Toda aprovação, recusa ou ajuste entra no `GOSTO.md` **na mesma rodada**. Ao ajustar uma peça, mude **só o que foi pedido**. Revisão vira nova versão (`v2`, `v3`), nunca sobrescreve. Regra que vale também para os posts da esteira deve ir para `esteira/post.css` ou `esteira/voz.mjs`, para as duas saídas não divergirem.

## Regras fixas

- Não publicar, agendar ou postar nada. A skill entrega arquivos.
- Compliance de `esteira/voz.mjs` é obrigatório: sem promessa de cobertura, superlativo, preço, marca de seguradora, número inventado ou depoimento sem autorização.
- Dados de exemplo (nome de cliente, conversa) são identificados como exemplo no slide.
- O leitor é o corretor. Português do Brasil, sem jargão de marketing.
