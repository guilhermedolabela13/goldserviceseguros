# Converte os PNGs gerados no Codex (1024x1536) em assets/fundos/NN.jpg (1080 de largura, proporção mantida;
# o CSS recorta em 4:5 ou 9:16 com background-size:cover). Uso: python3 carrosseis-v3/prep-fundos.py <pasta com oNN/*.png>
import sys,glob,os
from PIL import Image
src=sys.argv[1]
for d in sorted(glob.glob(os.path.join(src,'o??'))):
    pngs=sorted(glob.glob(os.path.join(d,'*.png')))
    if not pngs: continue
    nn=os.path.basename(d)[1:]
    im=Image.open(pngs[-1]).convert('RGB')
    im=im.resize((1080,round(im.height*1080/im.width)),Image.LANCZOS)
    im.save(f'carrosseis-v3/assets/fundos/{nn}.jpg',quality=92)
    print(nn,im.size)
