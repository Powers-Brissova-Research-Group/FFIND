import json
import omero_api as api

def save_datasets():
    dsets = api.get_datasets()
    dids = [int(dset.did) for dset in dsets]
    for did in dids:
        fname = str(did) + '.txt'
        print fname
        ids = {}
        dset = api.get_dataset_images(did)
        images = dset.imgs
        f = open(fname, 'w')
        for image in images:
            ids[int(image.id)] = [tag.tname for tag in image.get_tags()]
        data = json.dumps(ids)
        f.write(data)
        f.close() 

def save_index():
    imgs = api.get_all_images()
    img_dict = {}
    for img in imgs:
        img_dict[str(img.id)] = [tag.tname for tag in img.get_tags()]

    f = open('image_index.txt', 'w')
    f.write(json.dumps(img_dict))
    f.close
    
def main():
    save_datasets()

if __name__=='__main__':
    main()