import json
import requests
import urllib
import os
import pprint
import helper_classes
import omero_api as api
import threading
import time

class ImageThread (threading.Thread):
    def __init__(self, thread_id, iid):
        threading.Thread.__init__(self)
        self.thread_id = thread_id
        self.iid = iid
    
    def run(self):
        img = api.get_image_by_id(self.iid)
        kvals = img.key_values
        name = "%s%s-%s%s" % (kvals['Donor info - Age']['val'], kvals['Donor info - Sex']['val'], kvals['Donor info - Disease Status']['val'], kvals['Donor info - Disease Duration']['val'])
        # img.img_wrapper.setName(name)
        # print name

def timing(f):
    def wrap(*args):
        t1 = time.time()
        ret = f(*args)
        t2 = time.time()
        print "%s took %0.3f ms" % (f.func_name, (t2 - t1)*1000.0)

    return wrap
def get_image_list():
    f = open('image_index.txt', 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in imgs.keys() if len(imgs[i]) > 0]

def gen_image_name(iid):
    img = api.get_image_by_id(iid)
    kvals = img.key_values
    return "%s%s-%s%s" % (kvals['Donor info - Age']['val'], kvals['Donor info - Sex']['val'], kvals['Donor info - Disease Status']['val'], kvals['Donor info - Disease Duration']['val'])

@timing
def run_threaded(iids):
    for iid in iids:
        i_thread = ImageThread(iid, iid)
        i_thread.start()

@timing
def run_normal(iids):
    for iid in iids:
        name = gen_image_name(iid)

def main():
    imgs = get_image_list()
    run_threaded(imgs)
#    for img in imgs:
#        i_thread = ImageThread(img, img)
#        i_thread.start()
#        i_thread.join()    
#    print 'Active threads before termination: %s' % (threading.active_count())

if __name__=='__main__':
    main()
