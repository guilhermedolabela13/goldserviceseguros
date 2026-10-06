# Gold Service Seguros · Design system e esteira de posts

Tudo o que gera as peças de redes sociais da Gold: marca, layouts, acervo de referências e a esteira que transforma um assunto em post pronto.

## Estrutura

| Pasta | O que tem |
|---|---|
| `tokens/` | Cores, tipografia, espaços e o corte 45° (`tokens.css`) |
| `fonts/` | Inter e Fraunces (variáveis, subset latin) |
| `assets/` | Monograma (degradê, chapado, contorno) e wordmark vetorizados |
| `esteira/` | Layouts, estilos das peças, busca no acervo, voz da marca, renderizador e gerador |
| `acervo/` | `referencias.json` (16 estruturas de post) e `imagens/` com as referências visuais |
| `posts/` | O texto de cada post em JSON (uma fonte por post) |
| `saida/` | PNGs 1080×1350 e `legenda.txt` de cada post |
| `pesquisa/` | Relatório e notas da pesquisa de marcas, engajamento e regras SUSEP/CONAR |

## Uso

```bash
cd brand && npm install          # uma vez (usa o Chromium do Playwright)

npm run post -- "5 erros na renovação do seguro auto"          # assunto → post
npm run post -- "mitos do seguro de vida" --ref ref-mito-verdade # forçar referência
npm run post -- "cuidados nas férias" --sem-ia                    # só o esqueleto
npm run buscar -- "como acionar o sinistro"                       # ver qual referência casa
npm run render -- posts/01-renovacao-90-dias.json                 # renderizar após editar
npm run render:todos
```

**Texto pelo Claude:** defina `ANTHROPIC_API_KEY` (ou faça `ant auth login`). Sem credencial, a esteira gera um esqueleto com instruções entre `[colchetes]` em cada campo; preencha o JSON e rode `npm run render`.

## Como a esteira decide

1. **Busca** (`esteira/buscar.mjs`): BM25 sobre as palavras-chave e a descrição de cada referência, com sinônimos do mercado (carro = auto, casa = residencial…). Palavras que indicam a forma do post (mito, dicas, como, e se…?) pesam mais que o tema, porque o acervo guarda estruturas.
2. **Texto** (`esteira/voz.mjs`): o Claude segue a estrutura da referência slide a slide, na voz da Gold e com as regras de compliance.
3. **Checagem**: avisa promessa de cobertura, superlativo, preço, marca de seguradora, lei citada, depoimento de terceiro e número sem fonte.
4. **Render** (`esteira/render.mjs`): HTML + Playwright → PNG.

## Adicionar uma referência ao acervo

Coloque a imagem em `acervo/imagens/` e crie uma entrada em `acervo/referencias.json` com `palavras_chave`, `o_que_funciona` e a `estrutura` (lista de layouts com o papel de cada slide). Layouts disponíveis: `capa`, `texto`, `lista`, `passos`, `dado`, `mito`, `checklist`, `comparativo`, `citacao`, `cta`. Qualquer slide aceita `"tema": "ivory"` e `capa`/`texto`/`dado`/`cta` aceitam `"imagem"`.

## Antes de publicar

- Revise os avisos da checagem.
- Posts que citam lei: confira o texto original.
- Depoimentos só com autorização escrita.
- Legenda sempre com "Assessoria de seguros" e CNPJ (já vem no `legenda.txt`).
