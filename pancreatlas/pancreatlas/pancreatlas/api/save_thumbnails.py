import json
import requests
import urllib
import os
import pprint
USERNAME = 'api.user'
PASSWORD = 'ts6t6r1537k='

def get_image_list():
    f = open('pancreatlas/pancreatlas/pancreatlas/api/image_index.txt', 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in imgs.keys() if len(imgs[i]) > 0]

def get_token(session):
    url = "https://omero.app.vumc.org/api/v0/token/"
    r = session.request("GET", url)
    response = json.loads(r.text)
    return response['data']

def get_roi(iid, session):
    url = 'https://omero.app.vumc.org/api/v0/m/images/' + iid + '/rois/'
    r = session.request('GET', url)
    rois = json.loads(r.text)
    gallery_roi = None
    if rois['meta']['totalCount'] > 0:
        for roi in rois['data']:
            print 'checking for thumbnail in image %s' % (str(iid),)
            if 'Name' in roi and roi['Name'] == 'thumbnail':
                print 'found for %s' % (str(iid),)      
                gallery_roi = (int(roi['shapes'][0]['X']), int(roi['shapes'][0]['Y']), int(roi['shapes'][0]['Width']), int(roi['shapes'][0]['Height']))
    return gallery_roi

def save_thumbnail(iid, roi, session):
    url = 'https://omero.app.vumc.org/webgateway/render_image_region/%s/0/0/?c=1|0:65535$0000FF,2|0:65535$00FF00,3|0:65535$FF0000,4|0:65535$FFFF00&m=c&region=%s,%s,%s,%s' % (
        iid, roi[0], roi[1], roi[2], roi[3])

    fpath = 'pancreatlas/pancreatlas/pancreatlas/assets/new_thumbnails/%s.jpg' % (iid, )
    f = open(fpath, 'w')
    r = session.get(url, stream=True)
    if r.status_code == 200:
        for chunk in r.iter_content(1024):
            f.write(chunk)
    f.close()

    # urllib.retrieve(url, '%s' % (iid, ))

def login(token, session):
    url = "https://omero.app.vumc.org/api/v0/login/"

    payload = "server=1&username=api.user&password=ts6t6r1537k="
    headers = {
        'X-CSRFToken': str(token),
        'Content-Type': "application/x-www-form-urlencoded"
    }

    cookies = {
        'csrftoken': str(token)
    }

    response = session.request("POST", url, data=payload, headers=headers, cookies=cookies)
    return response.ok

def main():
    sesh = requests.Session()
    token = get_token(sesh)
    success = login(token, sesh)
    if success == True:
        iids = get_image_list()
        print len(iids)
        for iid in iids:
            roi = get_roi(iid, sesh)
            if roi != None:
                save_thumbnail(iid, roi, sesh)

if __name__=='__main__':
    main()