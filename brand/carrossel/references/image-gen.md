# Assets com image gen (3D e foto)

O Claude não gera imagem. Monta o prompt e a imagem é gerada no Codex (no PC do Guilherme) ou no ChatGPT. Quem aprova é sempre o Guilherme, uma rodada por vez, porque cada lote gasta a cota dele.

**Image gen é só para assets**: objeto, personagem sem rosto ou cena. Nunca a peça pronta (texto, layout e marca são HTML), nunca pessoa real, nunca logo de seguradora.

## 1. Antes de gerar, descartar nesta ordem
1. Asset já existente (ver `carrosseis/assets/*/manifest.json`).
2. Composição em HTML/CSS com as peças da marca (vidro, número grande, mensagem, monograma).
3. Só então uma imagem nova.

## 2. Dois estilos de imagem
| Estilo | Quando | Onde fica |
|---|---|---|
| **3D editorial Gold** (padrão para carrossel) | conceito, metáfora, situação do dia do corretor | `brand/assets/3d/<serie>/` |
| Foto still-life noturna | capa de post da esteira, objeto real que o tema pede | `brand/assets/fotos/` |

Não misture os dois no mesmo carrossel.

### 3D editorial Gold
Vem da skill original (3D editorial fosco, personagem sem rosto, série com âncora) com a paleta e a luz da Gold:
- **Material:** 3D fosco, plástico macio / argila, cantos levemente arredondados. Nada de cromado nem glossy.
- **Cores:** navy (#061C37, #12395F) como cor dominante dos objetos e da roupa; dourado fosco (#D7B05A) só em detalhes (botão, borda, ícone); marfim (#FAF6E8) nas superfícies claras.
- **Luz:** luz quente dourada vinda do alto à direita, como o brilho do fundo dos slides; sombra de contato suave.
- **Personagem:** o corretor. Sem traços faciais, proporções levemente estilizadas, terno ou camisa navy. Pessoa real nunca.
- **Fundo:** objeto e personagem em PNG transparente (o navy do slide faz o fundo); cenário em fundo navy cheio, 4:5, com o terço superior escuro e livre para o título.

| Tipo | Uso | Fundo |
|---|---|---|
| Objeto | metáfora num slide (celular com balão, escudo, chave, calendário) | transparente |
| Personagem | o corretor em uma ação | transparente |
| Cenário | o corretor dentro do ambiente, a série inteira | navy cheio, 4:5 |
| Ícone | chips e listas, legível em 64px | transparente |

Cenário: texto no terço superior, cena embaixo de borda a borda, sem card. Uma cena por série: mesmo personagem, mesmo escritório, mesma luz; muda enquadramento, pose e objetos. A primeira cena aprovada é a âncora das seguintes.

### Foto still-life
Objeto real do dia a dia do corretor, superfície escura, luz quente dourada lateral, fundo navy, pouca profundidade de campo. A âncora é `brand/assets/fotos/agenda.jpg`.

## 3. Anatomia do prompt
Uma linha por bloco, nesta ordem (os modelos da seção 5 já seguem isso):
1. **Sujeito** concreto.
2. **Função:** onde entra no slide e o que comunica.
3. **Âncora:** anexe a imagem aprovada da série ("siga exatamente o estilo da imagem anexada").
4. **Material e luz:** do estilo escolhido (3D fosco ou foto), sempre com luz quente dourada.
5. **Paleta** em hex, de `marca.json`. Navy domina, dourado só em detalhe.
6. **Composição:** 3D centralizado em ângulo 3/4 (~70% do quadro); cenário e foto com o terço superior livre.
7. **Fundo e tamanho:** transparente 2048×2048 (objeto, personagem, ícone) ou cheio 4:5 (cenário, foto).
8. **Restrições:** sem texto, letras, logos, rosto, glossy, cromado, neon, sparkles.

## 4. Fluxo
1. **Uma imagem primeiro (a âncora).** Aprovada ou recusada pelo Guilherme.
2. Recusa: pergunte o que incomodou, mude **um** bloco do prompt e registre no `GOSTO.md`.
3. Aprovada: vira a âncora da série. As variações usam o mesmo prompt trocando só o sujeito (ou a ação e o enquadramento, no cenário), sempre com a âncora anexada.
4. Lote de até 10. Checagem: fundo transparente de verdade, sem texto ou objeto estranho, mesma luz e ângulo, legível pequeno.
5. Salve em `brand/assets/3d/<serie>/NN-nome.png` (foto: `brand/assets/fotos/`, recortada em 4:5) e registre no `manifest.json` da série com o campo `use`.

## 5. Modelos

### 3D editorial Gold (objeto ou personagem)
```
Crie um objeto 3D: [SUJEITO].
Uso: asset de carrossel da Gold Service Seguros (assessoria para corretores) para comunicar [IDEIA].
Siga exatamente o estilo da imagem de referência anexada.
Estilo: 3D editorial fosco, plástico macio, cantos levemente arredondados, luz quente dourada do alto à direita, sombra de contato suave.
Paleta: navy #061C37 e #12395F dominantes, detalhes em dourado fosco #D7B05A, superfícies em marfim #FAF6E8.
Composição: centralizado, ângulo 3/4, ocupando ~70% do quadro.
Fundo transparente, PNG, 2048x2048.
Não incluir: texto, letras, logos, rostos, brilho glossy, cromado, neon, sparkles.
```
Personagem: acrescente "o corretor: pessoa sem traços faciais, proporções levemente estilizadas, terno navy com detalhe dourado, pose que mostra [AÇÃO]".

### 3D editorial Gold (cenário)
```
Crie uma cena 3D: o corretor [AÇÃO] em [AMBIENTE], com [OBJETOS QUE CONTAM A HISTÓRIA].
Personagem sem traços faciais, proporções levemente estilizadas, terno navy com detalhe dourado.
Estilo: 3D editorial fosco, plástico macio, luz quente dourada do alto à direita, ambiente noturno em tons de navy.
Paleta: navy #061C37 e #12395F, dourado fosco #D7B05A, marfim #FAF6E8.
Siga o personagem, o ambiente e a luz da imagem anexada (se houver).
Proporção 4:5, terço superior escuro e livre para o título, cena encostando nas bordas laterais e inferior.
Não incluir: texto, letras, logos, rostos, glossy, cromado, neon, sparkles.
```

### Foto still-life
```
Crie uma foto still-life editorial: [SUJEITO].
Uso: fundo de slide de carrossel da Gold Service Seguros para comunicar [IDEIA].
Siga exatamente a luz e o clima da imagem anexada.
Luz quente dourada vinda da esquerda, ambiente noturno, sombras profundas, pouca profundidade de campo.
Paleta: navy #061C37, dourado #D7B05A, toques de marfim #FAF6E8.
Composição vertical 4:5, objeto no terço superior, metade de baixo escura e limpa para o título.
Não incluir: texto, letras, logos, marcas, rostos, neon, sparkles.
```
No Codex, peça também: "salve em brand/assets/3d/<serie>/NN-nome.png" (3D) ou "brand/assets/fotos/<nome>.png" (foto) "e me mostre".
