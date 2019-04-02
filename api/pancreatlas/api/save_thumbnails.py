import json
import requests
import urllib
import os
import pprint
# USERNAME = 'api.user'
# PASSWORD = 'ts6t6r1537k='

def get_image_list():
    f = open('image_index.txt', 'r')
    enc = f.readline()
    imgs = json.loads(enc)
    return [str(i) for i in imgs.keys() if len(imgs[i]) > 0]

def get_token(session):
    url = "https://omero.app.vumc.org/api/v0/token/"
    r = session.request("GET", url)
    response = json.loads(r.text)
    return response['data']

def get_roi(iid, session):
    url = 'https://omero.app.vumc.org/api/v0/m/images/' + str(iid) + '/rois/'
    r = session.request('GET', url)
    rois = json.loads(r.text)
    gallery_roi = None
    if rois['meta']['totalCount'] > 0:
        for roi in rois['data']:
            # print 'checking for thumbnail in image %s' % (str(iid),)
            if 'Name' in roi and roi['Name'] == 'thumbnail':
                # print 'found for %s' % (str(iid),)
                gallery_roi = (int(roi['shapes'][0]['X']), int(roi['shapes'][0]['Y']), int(roi['shapes'][0]['Width']), int(roi['shapes'][0]['Height']))
    return gallery_roi

def get_size(iid, session):
    url = 'https://omero.app.vumc.org/api/v0/m/images/' + str(iid)
    r = session.request('GET', url)
    idata = json.loads(r.text)
    if 'data' in idata:
        return (int(int(idata['data']['Pixels']['SizeX']) / 2), int(int(idata['data']['Pixels']['SizeY']) / 2), 500, 500)
    else:
        return (0, 0, 500, 500)

def get_image_colors(iid, session):
    url = 'https://omero.app.vumc.org/webgateway/imgData/%s/' % (iid, )
    r = session.request('GET', url)
    chdata = [(0, 65535, 'FF0000'), (0, 65535, '00FF00'), (0, 65535, '0000FF')]
    if r.text != u'""':
        data = json.loads(r.text)
        channels = data['channels']
        chdata = [(int(channel['window']['start']), int(channel['window']['end']), channel['color']) for channel in channels]
    return chdata

def save_thumbnail(iid, roi, session):
    chdata = get_image_colors(iid, session)
    if len(chdata) == 3:
        chdata.append((0, 65535, 'FFFFFF'))
    url = 'https://omero.app.vumc.org/webgateway/render_image_region/%s/0/0/?c=1|%s:%s$%s,2|%s:%s$%s,3|%s:%s$%s,4|%s:%s$%s&m=c&region=%s,%s,%s,%s' % (iid, chdata[0][0], chdata[0][1], chdata[0][2], chdata[1][0], chdata[1][1], chdata[1][2], chdata[2][0], chdata[2][1], chdata[2][2], chdata[3][0], chdata[3][1], chdata[3][2], roi[0], roi[1], roi[2], roi[3])
    print url
    fpath = '/home/jmessmer/Documents/Projects/pancreatlas/react/src/assets/pancreatlas/thumbs/%s.jpg' % (iid, )
    f = open(fpath, 'w')
    r = session.get(url, stream=True)
    if r.status_code == 200:
        for chunk in r.iter_content(1024):
            f.write(chunk)
    f.close()
    print 'Saved %s' %(fpath, )
    # urllib.retrieve(url, '%s' % (iid, ))

def login(token, session):
    url = "https://omero.app.vumc.org/api/v0/login/"

    payload = "server=1&username=import.user&password=%2B0rLA6KdhQM%3D"
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
    print "Logged in? %s" % (success, )
    if success == True:
        # iids = get_image_list()
        iids = [17862, 17763, 17770, 17773]
        print len(iids)
        for iid in iids:
            # save_thumbnail(iid, None, sesh)
			# print 'Saved %s' % (iid, )
            region = get_roi(iid, sesh)
            if region != None:
               save_thumbnail(iid, region, sesh)
            else:
               size = get_size(iid, sesh)
               print 'Other: %s' % (size, )
               save_thumbnail(iid, size, sesh)
            print 'Saved %s' % (iid, )

if __name__=='__main__':
    main()
