# Fotos com image gen

O Claude não gera imagem. Monta o prompt e a foto é gerada no Codex (no PC do Guilherme) ou no ChatGPT. Quem aprova é sempre o Guilherme, uma rodada por vez, porque cada lote gasta a cota dele.

**Image gen é só para a foto**: um objeto ou uma cena sem pessoas. Nunca a peça pronta (texto, layout e marca são HTML), nunca pessoa real, nunca logo de seguradora.

## 1. Antes de gerar, descartar nesta ordem
1. Foto já existente em `brand/assets/fotos/` (ver `carrosseis/assets/fotos/manifest.json`).
2. Composição em HTML/CSS com as peças da marca (vidro, número grande, mensagem, monograma).
3. Só então uma foto nova.

## 2. Estilo da série Gold
Still-life editorial noturno: objeto real do dia a dia do corretor ou do segurado (agenda, chave de carro, celular, casa iluminada, aperto de mão sem rosto), superfície escura, **luz quente dourada lateral**, fundo navy profundo, pouca profundidade de campo. A âncora é `agenda.jpg`.

## 3. Anatomia do prompt
Uma linha por bloco, nesta ordem:
1. **Sujeito** concreto.
2. **Função:** capa ou fundo de slide, e o que comunica.
3. **Âncora:** anexe `brand/assets/fotos/agenda.jpg` ("siga exatamente a luz e o clima da imagem anexada").
4. **Luz:** luz quente dourada vinda da esquerda, sombras profundas, reflexos suaves.
5. **Paleta:** navy #061C37 e #030E1C, dourado #D7B05A e #F8D077, marfim #FAF6E8.
6. **Composição:** objeto no terço superior ou central, metade de baixo mais escura e limpa para o título.
7. **Tamanho:** 4:5 vertical, 1024×1536 ou maior (recortar para 4:5).
8. **Restrições:** sem texto, letras, logos, marcas, rosto de pessoa, neon, sparkles.

## 4. Fluxo
1. **Uma foto primeiro.** Aprovada ou recusada pelo Guilherme.
2. Recusa: pergunte o que incomodou, mude **um** bloco do prompt e registre no `GOSTO.md`.
3. Aprovada: recorte para 4:5, salve em `brand/assets/fotos/<nome>.jpg` e registre no `manifest.json` com o campo `use`.

## 5. Modelo
```
Crie uma foto still-life editorial: [SUJEITO].
Uso: fundo de slide de carrossel da Gold Service Seguros para comunicar [IDEIA].
Siga exatamente a luz e o clima da imagem anexada.
Luz quente dourada vinda da esquerda, ambiente noturno, sombras profundas, pouca profundidade de campo.
Paleta: navy #061C37, dourado #D7B05A, toques de marfim #FAF6E8.
Composição vertical 4:5, objeto no terço superior, metade de baixo escura e limpa para o título.
Não incluir: texto, letras, logos, marcas, rostos, neon, sparkles.
```
No Codex, peça também: "salve em brand/assets/fotos/<nome>.png e me mostre".
