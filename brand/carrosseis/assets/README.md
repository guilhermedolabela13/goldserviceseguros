# Assets

Duas séries de imagem, com os arquivos em `brand/assets/` (uma fonte só para a esteira e para o carrossel):
- `3d/`: série 3D editorial Gold, o padrão do carrossel (ver `3d/README.md`).
- `fotos/`: fotos still-life noturnas, usadas nas capas da esteira.

Esta pasta guarda os `manifest.json` de cada série, para a skill saber o que já existe antes de pedir imagem nova:

```json
{
  "style": "descrição do estilo da série",
  "anchor": "arquivo que serviu de âncora de estilo",
  "path": "../../../assets/fotos/",
  "assets": [{"file": "agenda.jpg", "use": "quando usar"}]
}
```

`path` é relativo ao slide (`brand/carrosseis/<id>/vN/`). Foto nova: 4:5, 2048px ou mais no lado maior, salva em `brand/assets/fotos/` e registrada aqui.
