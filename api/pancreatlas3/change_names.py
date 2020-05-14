import json
import requests
import urllib.request, urllib.parse, urllib.error
import os
import pprint
import api.helper_classes
import api.omero_api as api
import threading
import time
import sys

def timing(f):
    def wrap(*args):
        t1 = time.time()
        ret = f(*args)
        t2 = time.time()
        print("%s took %0.3f ms" % (f.__name__, (t2 - t1)*1000.0))
    return wrap

def connect(fn):
    def wrap(*args, **kwargs):
        conn = BlitzGateway('import.user', '+0rLA6KdhQM=', host='10.152.140.10', port=4064)
        try:
            conn.connect()
            fn(*args, conn=conn, **kwargs)
        finally:
            try:
                conn.close()
            except:
                print("Failed to close OMERO connection")
    return wrap

def get_image_list(dsid):
    f = open('/app001/www/assets/pancreatlas/datasets/%s.txt' % (dsid), 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in list(imgs.keys()) if len(imgs[i]) > 0]

@connect
def gen_image_name(iid, conn=None):
    img = api.get_image_by_id(conn, iid)
    kvals = img.key_values
    id = ''
    region = ''
    if 'Donor info - Program ID' in kvals and kvals['Donor info - Program ID']['val'] != '':
         id = kvals['Donor info - Program ID']['val']
    else:
        id = kvals['Donor info - LIMS ID']['val']
    if 'Image info - Pancreas Region' in kvals:
        region = kvals['Image info - Pancreas Region']['val']
    else:
        region = kvals['Sample info - Pancreas Region']['val']
    if (kvals['Donor info - Disease Status']['val'] == 'ND'):
        name = "%s-%s-%s-%s-%s" % (id, kvals['Donor info - Disease Status']['val'], kvals['Donor info - Age']['val'], kvals['Donor info - Sex']['val'], region)
    else:
        name = "%s-%s-%s-%s-%s-%s" % (id, kvals['Donor info - Disease Status']['val'], kvals['Donor info - Age']['val'], kvals['Donor info - Disease Duration']['val'], kvals['Donor info - Sex']['val'], region)
    print("%s --> %s" % (img.name, name))
    img.img_wrapper.setName(name)
    img.img_wrapper.save()

def get_image_list(dsid):
    f = open('/app001/www/assets/pancreatlas/datasets/%s.txt' % (dsid), 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in list(imgs.keys()) if len(imgs[i]) > 0]

@timing
def run_normal(iids):
    for iid in iids:
        name = gen_image_name(iid)

def main():
    if len(sys.argv) <= 1:
        sys.exit("Insufficient arguments provided")
    dsid = sys.argv[1]
    imgs = get_image_list(dsid)
    run_normal(imgs)
#    for img in imgs:
#        i_thread = ImageThread(img, img)
#        i_thread.start()
#        i_thread.join()    
#    print 'Active threads before termination: %s' % (threading.active_count())

if __name__=='__main__':
    main()
