# Mede onde a cena começa e termina em cada fundo (assets/fundos/desloc.json, em px da imagem com 1080 de largura),
# comparando cada linha com a cor do fundo do topo. O slide usa isso para posicionar o fundo (ver gerar.mjs).
import glob,os,json
import numpy as np
from PIL import Image
out={}
for f in sorted(glob.glob('carrosseis-v3/assets/fundos/??.jpg')):
    nn=os.path.basename(f)[:2]
    a=np.asarray(Image.open(f).convert('RGB')).astype(int)
    bg=a[20:120].reshape(-1,3).mean(0)
    d=np.abs(a-bg).sum(2)
    rows=np.where((d>60).mean(1)>0.04)[0]
    top,bot=(int(rows.min()),int(rows.max())) if len(rows) else (0,0)
    # o piso escurece/clareia perto da base: ignore as últimas linhas se forem contínuas até o fim
    out[nn]=[top,bot]; print(nn,'cena',top,bot)
json.dump(out,open('carrosseis-v3/assets/fundos/desloc.json','w'))
