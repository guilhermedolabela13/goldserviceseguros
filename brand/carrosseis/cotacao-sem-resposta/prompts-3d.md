# Prompts 3D · cotacao-sem-resposta (v2)

Série nova `corretor`. Gerar no Codex **uma imagem primeiro** (a 01, que vira a âncora); as outras só depois da aprovação, sempre com a 01 anexada. Salvar em `brand/assets/3d/corretor/`.

## 01-corretor-celular.png · cenário · capa (âncora)
```
Crie uma cena 3D: o corretor sentado à mesa do escritório à noite, olhando o celular na mão, esperando uma resposta que não chega. Na mesa: notebook fechado, uma pasta de proposta e uma xícara. Um relógio na parede marcando fim de tarde.
Uso: capa de carrossel da Gold Service Seguros (assessoria para corretores) sobre o cliente que sumiu depois da cotação.
Personagem sem traços faciais, proporções levemente estilizadas, terno navy com detalhe dourado.
Estilo: 3D editorial fosco, plástico macio, cantos levemente arredondados, luz quente dourada do alto à direita, ambiente noturno em tons de navy, sombra de contato suave.
Paleta: navy #061C37 e #12395F dominantes, dourado fosco #D7B05A em detalhes, marfim #FAF6E8 nas superfícies claras.
Proporção 4:5 (1024x1280 ou maior), terço superior escuro e livre para o título, cena encostando nas bordas laterais e inferior.
Não incluir: texto, letras, números legíveis, logos, rostos, glossy, cromado, neon, sparkles.
Salve em brand/assets/3d/corretor/01-corretor-celular.png e me mostre.
```

## 02-celular-balao.png · objeto · mensagem 1 (no dia seguinte)
```
Crie um objeto 3D: um smartphone em pé, levemente inclinado, com um balão de mensagem saindo da tela e um pequeno documento dobrado ao lado.
Uso: asset de carrossel da Gold Service Seguros para comunicar "mande algo útil sobre a cotação".
Siga exatamente o estilo da imagem de referência anexada.
Estilo: 3D editorial fosco, plástico macio, cantos levemente arredondados, luz quente dourada do alto à direita, sombra de contato suave.
Paleta: navy #061C37 e #12395F dominantes, balão em dourado fosco #D7B05A, documento em marfim #FAF6E8.
Composição: centralizado, ângulo 3/4, ocupando ~70% do quadro.
Fundo transparente, PNG, 2048x2048.
Não incluir: texto, letras, logos, rostos, brilho glossy, cromado, neon, sparkles.
Salve em brand/assets/3d/corretor/02-celular-balao.png e me mostre.
```

## 03-duas-opcoes.png · objeto · mensagem 2 (três dias depois)
```
Crie um objeto 3D: duas pastas de proposta lado a lado, uma navy e outra com borda dourada, levemente abertas, com uma balança pequena entre elas.
Uso: asset de carrossel da Gold Service Seguros para comunicar "traga uma segunda opção para comparar".
(demais linhas iguais ao 02, trocando o nome do arquivo para 03-duas-opcoes.png)
```

## 04-porta-aberta.png · objeto · mensagem 3 (uma semana depois)
```
Crie um objeto 3D: uma porta navy entreaberta, com luz quente dourada saindo pela fresta, num pequeno batente marfim.
Uso: asset de carrossel da Gold Service Seguros para comunicar "pause com respeito e deixe a porta aberta".
(demais linhas iguais ao 02, trocando o nome do arquivo para 04-porta-aberta.png)
```

## Onde entram
- 01: `.cenario` no slide 1 (título no terço superior).
- 02 a 04: `.asset` nos slides 3 a 5, saindo de trás do card da mensagem pelo canto inferior direito, ~520px.
