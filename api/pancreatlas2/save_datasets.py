import json
import api.omero_api as api
from omero.gateway import BlitzGateway

def save_datasets(conn, dids):
    for did in dids:
        print "Saving %s" % (str(did),)
        fname = "/app001/www/assets/pancreatlas/datasets/%s.txt" % (str(did), )
        print fname
        ids = {}
        images = api.get_images_from_dataset(conn, did)
#        images = dset.imgs
        f = open(fname, 'w')
        for image in images:
            if 'exclude' not in [tag['tag'] for tag in image.get_tags()]:
                ids[int(image.id)] = [{'tagset': tag['tagset'], 'tag': tag['tag']} for tag in image.get_tags()]
        data = json.dumps(ids)
        f.write(data)
        f.close() 

def save_index(dids):
    img_dict = {}
    for did in dids:
        print 'Retrieving images'
        imgs = api.get_images_from_dataset(did)
        print 'Images retrieved'
        # POSSIBLE_TAGS = ['INS', 'COL4A1', 'SST', 'PECAM1', 'PTF1A', 'CPA1', 'FOXA2', 'AMY1A', 'GP2', 'NKX6-1', 'PAX6', 'SYP', 'GCG', 'PPY', 'MK167', 'SYN1', 'SYN2', 'Ki67', 'SOX9', 'AMY1A', 'ONECUT1', 'HNF1B', 'PAX6', 'GP2', 'NKX6-1', 'PTF1A', 'NEUROG3', 'GHRL', 'CDH1']
        for img in imgs:
            print img.id
            tags = [tag['tag'] for tag in img.get_tags()]
            if 'macro image' not in img.name and 'label image' not in img.name:
                print 'WARNING: Double check import for image %s' % (img.id,)
            img_dict[str(img.id)] = [tags]

    f = open('/app001/www/assets/pancreatlas/datasets/image_index.txt', 'w')
    f.write(json.dumps(img_dict))
    f.close
    
def main():
    conn = BlitzGateway('api.user', 'ts6t6r1537k=', host='10.152.140.10', port=4064)
    try:
        conn.connect()
        dsets = [ds.did for ds in api.get_private_datasets(conn)]
        save_datasets(conn, dsets)
        #save_index(dsets)
    finally:
        try:
            conn.close()
        except:
            print("Failed to close omero connection")

if __name__=='__main__':
    main()
