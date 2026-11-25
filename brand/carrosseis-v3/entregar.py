# Monta a entrega: PDF com todos os slides (um post após o outro), folha das capas e cópia dos PNGs.
# Uso (de brand/): python3 carrosseis-v3/entregar.py /mnt/project-files/gold/carrosseis-v3
import sys,glob,os,shutil
from PIL import Image
dst=sys.argv[1];os.makedirs(dst,exist_ok=True)
posts=sorted(d for d in glob.glob('carrosseis-v3/[0-9][0-9]-*') if os.path.isdir(d))
pages=[];capas=[]
for p in posts:
    id=os.path.basename(p);os.makedirs(f'{dst}/slides/{id}',exist_ok=True)
    for f in sorted(glob.glob(f'{p}/v1/slide-??.png')):
        shutil.copy(f,f'{dst}/slides/{id}/'+os.path.basename(f))
        pages.append(Image.open(f).convert('RGB'))
    capas.append(Image.open(f'{p}/v1/slide-01.png').convert('RGB'))
pages[0].save(f'{dst}/carrosseis-v3-gold.pdf',save_all=True,append_images=pages[1:],resolution=144,quality=88)
w,h=360,450;cols=5;rows=(len(capas)+cols-1)//cols
S=Image.new('RGB',(cols*(w+12)+12,rows*(h+12)+12),'#E9E4D6')
for k,im in enumerate(capas):
    S.paste(im.resize((w,round(im.height*w/im.width))).crop((0,0,w,h)),(12+(k%cols)*(w+12),12+(k//cols)*(h+12)))
S.save(f'{dst}/capas.png')
print(len(pages),'páginas')
