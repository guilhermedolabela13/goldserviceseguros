# Entrega

Comandos rodados de dentro de `brand/`.

## 1. Arquivos
`carrosseis/<id>/v<N>/`: `slide-NN.html`, `slide-NN.png` (1080×1350) e `slide-NN-2x.png` (2160×2700), gerados por `node carrossel/scripts/render.mjs <id>/v<N>`.

## 2. Checagem de compliance
```
node carrossel/scripts/checar-copy.mjs <id>/v<N>
```
Lê o texto dos slides e a legenda registrada e roda a mesma `verificar()` da esteira (`esteira/voz.mjs`). Aviso não bloqueia, mas precisa aparecer na entrega.

## 3. Registro
Adicionar em `carrosseis.json` (tema novo = item novo; revisão = versão nova no mesmo item, e todas as versões precisam do mesmo número de slides):
```json
{
  "id": "cotacao-sem-resposta",
  "title": "Título do carrossel",
  "description": "Uma linha sobre o tema",
  "pillar": "Inteligência comercial",
  "createdAt": "AAAA-MM-DD",
  "slideCount": 6,
  "status": "Em revisão · não publicado",
  "cover": "cotacao-sem-resposta/v1/slide-01.png",
  "viewer": "cotacao-sem-resposta/v1/ver-carrossel.html",
  "versions": [{"label": "v1 · descrição curta", "href": "cotacao-sem-resposta/v1/ver-carrossel.html"}],
  "caption": "Legenda pronta, terminando com o rodapé legal",
  "hashtags": ["#corretordeseguros", "#goldserviceseguros"],
  "platforms": ["Instagram", "LinkedIn"]
}
```
A legenda termina sempre com `Gold Service Seguros · Assessoria de seguros · CNPJ 10.875.768/0001-62`. Atualize `updatedAt`.

## 4. Slider e galeria
```
node carrossel/scripts/build-viewer.mjs <id>
node carrossel/scripts/build-gallery.mjs
```
O slider tem navegação, comparação lado a lado entre versões, legenda com botão de copiar, download do slide e ZIP do carrossel em 2x.

## 5. Mostrar
Abra `carrosseis/index.html` (ou o `ver-carrossel.html`) e mostre ao Guilherme, com a capa recomendada, a legenda e os avisos da checagem.
