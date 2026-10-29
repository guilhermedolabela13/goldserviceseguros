# /carrossel · edição Gold

Versão da skill [guilhermealvestech/carrossel-skill](https://github.com/guilhermealvestech/carrossel-skill) (MIT, ver `LICENSE`) com o design system da Gold aplicado. O workflow é o da original; a marca, a voz e o compliance vêm de `brand/`.

## O que mudou em relação à original

| Original | Edição Gold |
|---|---|
| Onboarding de marca (existente ou do zero) | Sem onboarding: `templates/projeto/` já traz `marca.json`, `manual.md`, `GOSTO.md` e o manifesto das fotos da Gold |
| `slide-base.html` com tokens trocados à mão | `slide-base.html` carrega `tokens/tokens.css`, `esteira/post.css` e `templates/carrossel.css`; nenhuma cor à mão |
| Fundo claro, sem glow, 3D fosco | Navy com brilho dourado, vidro com corte 45°, ênfase em Fraunces itálico, fotos still-life noturnas |
| Voz livre definida no onboarding | Voz B2B (corretor) e compliance SUSEP/CONAR de `esteira/voz.mjs` |
| — | `scripts/checar-copy.mjs`: roda a checagem de compliance da esteira no texto dos slides e na legenda |
| `GOSTO.md` vazio | Já com as recusas dos posts de lançamento (moldura, contador, "Deslize", selo Mito/Verdade) |

Os outros scripts (render, slider, galeria) são os da original; `brand.mjs` ganhou só a troca do nome em caixa alta no slider.

## Uso

```bash
cd brand
npm install --prefix carrossel
npx --prefix carrossel playwright install chromium
node carrossel/scripts/checar-setup.mjs

node carrossel/scripts/render.mjs cotacao-sem-resposta/v1     # HTML → PNG 1x e 2x
node carrossel/scripts/checar-copy.mjs cotacao-sem-resposta/v1 # compliance
node carrossel/scripts/build-viewer.mjs cotacao-sem-resposta   # slider
node carrossel/scripts/build-gallery.mjs                       # galeria
```

O projeto fica em `brand/carrosseis/`. Abra `carrosseis/index.html` para ver a galeria. O `export-assets.js` (usado pelo botão de baixar o ZIP) não vai para o git porque passa de 10 MB: rode `build-viewer.mjs` para gerá-lo.

## Instalar como skill

No Claude Code: `cp -r brand/carrossel ~/.claude/skills/carrossel-gold`. A skill espera ser rodada de dentro de `brand/` deste repositório, porque usa os tokens, as fontes e a voz daqui.

## Esteira ou carrossel?

- **Esteira** (`npm run post`): assunto → referência do acervo → texto → PNG. Rápida, layouts fixos, boa para volume.
- **Carrossel**: roteiro aprovado antes, slides compostos um a um, galeria com versões e gosto acumulado. Para peças que pedem mais cuidado.

As duas usam o mesmo `post.css` e a mesma `voz.mjs`; regra visual nova que valha para as duas vai para lá.
