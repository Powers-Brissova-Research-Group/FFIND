import json
import requests
import urllib
import os
import pprint
import helper_classes
import omero_api as api
import threading
import time
import sys

new_names = {}

class ImageThread (threading.Thread):
    def __init__(self, thread_id, iid):
        threading.Thread.__init__(self)
        self.thread_id = thread_id
        self.iid = iid
    
    def run(self):
        img = api.get_image_by_id(self.iid)
        kvals = img.key_values
        id = ''
        region = ''
        if 'Donor info - Program ID' in kvals:
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
        img.img_wrapper.setName(name)
        img.img_wrapper.save()
        new_names[img.id] = name

def timing(f):
    def wrap(*args):
        t1 = time.time()
        ret = f(*args)
        t2 = time.time()
        print "%s took %0.3f ms" % (f.func_name, (t2 - t1)*1000.0)

    return wrap
def get_image_list(dsid):
    f = open('/app001/www/assets/pancreatlas/datasets/%s.txt' % (dsid), 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in imgs.keys() if len(imgs[i]) > 0]

def gen_image_name(iid):
    img = api.get_image_by_id(iid)
    kvals = img.key_values
    return "%s%s-%s%s" % (kvals['Donor info - Age']['val'], kvals['Donor info - Sex']['val'], kvals['Donor info - Disease Status']['val'], kvals['Donor info - Disease Duration']['val'])

@timing
def run_threaded(iids):
    threads = []
    for iid in iids:
        i_thread = ImageThread(iid, iid)
        threads.append(i_thread)
    for t in threads:
        t.start()
    for t in threads:
        t.join()

@timing
def run_normal(iids):
    for iid in iids:
        name = gen_image_name(iid)

def main():
    if len(sys.argv) <= 1:
        sys.exit("Insufficient arguments provided")
    dsid = sys.argv[1]
    imgs = get_image_list(disd)
    run_threaded(imgs)
#    for img in imgs:
#        i_thread = ImageThread(img, img)
#        i_thread.start()
#        i_thread.join()    
#    print 'Active threads before termination: %s' % (threading.active_count())

if __name__=='__main__':
    main()
