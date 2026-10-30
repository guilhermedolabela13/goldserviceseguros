# Visual

A identidade da Gold substitui a direção visual padrão da skill original (fundo claro, sem glow). Aqui o padrão é **navy profundo com brilho dourado, vidro com corte 45° e ênfase em serifa itálica dourada**. As medidas vêm de `brand/tokens/tokens.css`.

## Partir do que foi aprovado
Abra a galeria (`carrosseis/index.html`), os PNGs das versões aprovadas e os posts em `brand/saida/`. Reaproveite margens, posição do eyebrow e do monograma, tamanhos de título e o tipo de destaque. Mudança de linguagem só se o Guilherme pedir.

## Peças prontas (classes)
| Classe | De onde | Uso |
|---|---|---|
| `.post.navy` / `.post.ivory` | post.css | fundo do slide (navy é o padrão) |
| `.topo`, `.eyebrow`, `.mono` | post.css | topo: pilar à esquerda, monograma à direita |
| `.display.xl/.l/.m`, `em` | post.css | título e a palavra de ênfase |
| `.lead`, `.corpo`, `.nota`, `.fio` | post.css | apoio, corpo, observação, fio dourado |
| `.vidro` | post.css | card de vidro com corte 45° |
| `.lista`, `.passos`, `.check`, `.comp` | post.css | listas numeradas, passos, checklist, comparativo |
| `.dado-num`, `.num-grande` | post.css | número em destaque |
| `.botao`, `.wordmark` | post.css | CTA |
| `.foto` | post.css | foto de fundo inteiro com degradê (capa) |
| `.alto` | carrossel.css | título no terço superior |
| `.foto-base` | carrossel.css | foto sangrando pela base, texto em cima |
| `.msg`, `.msg-rot`, `.msg-txt`, `.msg-hora`, `.porque` | carrossel.css | conversa, roteiro de fala, script |
| `.etapa` | carrossel.css | momento de uma sequência (dia 1, dia 4...) sem numerar slide |
| `.mono-fundo` | carrossel.css | monograma grande cortado pela borda |
| `.asset` | carrossel.css | asset 3D transparente, grande, sangrando ou apoiado num card |
| `.cenario` | carrossel.css | cenário 3D 4:5 de fundo, título no terço superior |

Precisa de uma composição nova? Escreva em `carrossel.css` e reutilize nos próximos; não espalhe `style=""`.

## Composição
- **Um foco por slide.** Dois protagonistas viram dois slides.
- **Margem lateral fixa** de 88px. Nada colado na borda, a não ser foto ou monograma que sangra de propósito.
- **Hierarquia:** título 84 a 116px na capa, 64 a 84px no miolo; apoio 32 a 38px; nada abaixo de 24px.
- **Sem vazio morto:** se o slide tem pouco texto, o título cresce ou entra um card ou foto grande. Metade do slide vazia é erro.
- **Destaque:** uma expressão em Fraunces itálico dourado por título.

## Assets 3D e fotos
- Padrão do carrossel: **série 3D editorial Gold** (`references/image-gen.md`), o corretor sem rosto e objetos foscos em navy com detalhe dourado. Fica em `brand/assets/3d/<serie>/`.
- Grandes e integrados: saindo de trás de um card de vidro, sangrando pela borda, apoiados na composição. Nunca pequenos e soltos no meio.
- Situação vivida (o corretor fazendo algo) vira **cenário**: título no terço superior, cena embaixo de borda a borda, sem card. Conceito ou metáfora fica com **objeto**.
- Uma série por carrossel: não misture 3D com foto nem duas séries 3D.
- Foto still-life (`brand/assets/fotos/`) continua valendo para a esteira e para temas que pedem o objeto real.
- Texto sobre imagem sempre com o degradê da classe; confira o contraste no PNG.

## Fundo
Navy com brilho dourado no canto superior direito (já está no `.post.navy`). Um slide em marfim no máximo, para quebrar o ritmo. O CTA fica em navy.

## Evitar
- Moldura dourada, contador de slides, "Deslize", selo Mito/Verdade (`GOSTO.md`).
- Cantos arredondados em cards e botões (a forma da marca é o corte 45°), emoji, sparkles, ícones de banco.
- Dourado em grandes áreas: é acento (10%).
- Muitos elementos competindo; texto centralizado longo.

## Checagem visual (obrigatória)
Depois do render, olhe cada PNG: corte de texto, sobreposição, título colado no fim da linha, contraste sobre foto, vazio morto, consistência entre slides, mais de uma ênfase por título. Corrija antes de mostrar.
