# Folha de contato: python3 carrosseis-v3/folha.py saida.png [ids...] — uma linha por post
import sys,glob,os
from PIL import Image
out=sys.argv[1];ids=sys.argv[2:] or sorted(os.path.basename(d) for d in glob.glob('carrosseis-v3/[0-9][0-9]-*'))
rows=[]
for i in ids:
    fs=sorted(glob.glob(f'carrosseis-v3/{i}*/v1/slide-??.png'))
    rows.append([Image.open(f) for f in fs])
w=300;cols=max(len(r) for r in rows)
H=[max(round(im.height*w/im.width) for im in r) for r in rows]
S=Image.new('RGB',(cols*(w+8),sum(h+8 for h in H)),'#ddd');y=0
for r,h in zip(rows,H):
    for k,im in enumerate(r): S.paste(im.resize((w,round(im.height*w/im.width))),(k*(w+8),y))
    y+=h+8
S.save(out)
