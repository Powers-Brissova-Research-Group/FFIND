import json
import requests
import urllib
import os
import pprint
import sys
# USERNAME = 'api.user'
# PASSWORD = 'ts6t6r1537k='

def get_image_list(list_loc):
    # react\src\assets\pancreatlas\image_index.txt
    f = open(list_loc, 'r')
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
            # print 'checking for thumbnail in image %s' % (str(iid),)
            if 'Name' in roi and roi['Name'] == 'thumbnail':
                # print 'found for %s' % (str(iid),)
                if 'Transform' in roi['shapes'][0]:
                    transform = roi['shapes'][0]['Transform']
                    matrix = [[transform['A00'], transform['A01'], transform['A02']], [transform['A10'], transform['A11'], transform['A12']]]
                    coords = (int(roi['shapes'][0]['X']), int(roi['shapes'][0]['Y']))
                    (x_prime, y_prime) = find_origin(coords, int(roi['shapes'][0]['Width']), int(roi['shapes'][0]['Height']), matrix)
                    gallery_roi = (x_prime, y_prime, int(roi['shapes'][0]['Width']), int(roi['shapes'][0]['Height']))
                else:
                    gallery_roi = (int(roi['shapes'][0]['X']), int(roi['shapes'][0]['Y']), int(roi['shapes'][0]['Width']), int(roi['shapes'][0]['Height']))
    return gallery_roi

def find_origin(coords, width, height, matrix):
    min = transform_coords(coords, matrix)
    for i in range(0, 2):
        for j in range(0, 2):
            x = coords[0] + width * i
            y = coords[1] + height * j
            transformed = transform_coords((x, y), matrix)
            if transformed[0] < min[0] and transformed[1] < min[1]:
                min = transformed
    return transformed

def transform_coords(coords, matrix):
    print "Transforming coordinates"
    x = coords[0]
    y = coords[1]
    x_prime = int(matrix[0][0] * x + matrix[0][1] * y + matrix[0][2])
    y_prime = int(matrix[1][0] * x + matrix[1][1] * y + matrix[1][2])
    return (x_prime, y_prime)

def get_size(iid, session):
    url = 'https://omero.app.vumc.org/api/v0/m/images/' + iid
    r = session.request('GET', url)
    idata = json.loads(r.text)
    if 'data' in idata:
        return (int(int(idata['data']['Pixels']['SizeX']) / 2), int(int(idata['data']['Pixels']['SizeY']) / 2), 500, 500)
    else:
        return (0, 0, 500, 500)

def get_image_colors(iid, session):
    url = 'https://omero.app.vumc.org/webgateway/imgData/%s/' % (iid, )
    r = session.request('GET', url)
    data = json.loads(r.text)
    channels = data['channels']
    chdata = [(int(channel['window']['start']), int(channel['window']['end']), channel['color']) for channel in channels]
    return chdata

def save_thumbnail(iid, roi, session, save_loc):
    chdata = get_image_colors(iid, session)
    if len(chdata) == 3:
        chdata.append((0, 65535, 'FFFFFF'))
    url = 'https://omero.app.vumc.org/webgateway/render_image_region/%s/0/0/?c=1|%s:%s$%s,2|%s:%s$%s,3|%s:%s$%s,4|%s:%s$%s&m=c&region=%s,%s,%s,%s' % (iid, chdata[0][0], chdata[0][1], chdata[0][2], chdata[1][0], chdata[1][1], chdata[1][2], chdata[2][0], chdata[2][1], chdata[2][2], chdata[3][0], chdata[3][1], chdata[3][2], roi[0], roi[1], roi[2], roi[3])
    print url
    fpath = '%s/%s.jpg' % (save_loc, iid)
    f = open(fpath, 'w')
    r = session.get(url, stream=True)
    if r.status_code == 200:
        for chunk in r.iter_content(1024):
            f.write(chunk)
    f.close()
    print 'Saved %s' %(fpath, )
    # urllib.retrieve(url, '%s' % (iid, ))

def login(token, session):
    print "Logging in"
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
    print "Generating session"
    sesh = requests.Session()
    token = get_token(sesh)
    print "Session successfully generated"
    success = login(token, sesh)
    print "Logged in? %s" % (success, )
    if (len(sys.argv) < 3):
        sys.exit("Insufficient arguments provided.")
    list_loc = sys.argv[1]
    save_loc = sys.argv[2]
    if success == True:
        iids = get_image_list(list_loc)
        print len(iids)
        for iid in iids:
            # save_thumbnail(iid, None, sesh)
			# print 'Saved %s' % (iid, )
            region = get_roi(iid, sesh)
            if region != None:
               save_thumbnail(iid, region, sesh, save_loc)
            else:
               size = get_size(iid, sesh)
               print 'Other: %s' % (size, )
               save_thumbnail(iid, size, sesh, save_loc)
            print 'Saved %s' % (iid, )

if __name__=='__main__':
    main()
