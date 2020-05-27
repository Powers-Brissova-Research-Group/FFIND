import omero_api as api
import math
import pprint
import json
import os


def save_thumbs():
    (conn, success) = api.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
    if success:
        try:
            print os.getcwd()
            api.fetch_tags()

            dsets = api.get_datasets()
            dids = [int(dset.did) for dset in dsets]
            for did in dids:
                fname = str(did) + '.txt'
                print fname
                ids = {}
                dset = api.get_dataset_images(did)
                images = dset.imgs
                print images
                f = open(fname, 'w')
                for image in images:
                    ids[int(image.id)] = [tag.tname for tag in image.get_tags()]
                data = json.dumps(ids)
                f.write(data)
                f.close() 
            # pprint.pprint(api.generate_image_matrix_from_ds('AGE', 'PANCREAS REGION', 203))
            # matrix = api.generate_image_matrix(conn, 'Age'.upper(), 'Pancreas Region'.upper())
            # pprint.pprint(matrix)
            # pprint.pprint(matrix[1])
            # api.fetch_tags(conn)
            # image = api.get_image_by_id(conn, 6056)
            # print 'Can write? ' + str(conn.canWrite(image.img_wrapper))
            # changeColors(conn, image.img_wrapper)
            # f = open('image_ids.txt', 'w')
            # images = api.get_images_union_from_tags(["Aperio", "Leica", "Zeiss"])
            # for image in images:
            #     ids[int(image.id)] = [tag.tname for tag in image.get_tags()]
            #     # print image.file_name
            #     # changeColors(image.img_wrapper)
            #     # thumbnail_size = get_longest(image)
            #     # detail_size = get_longest_detail(image)
            #     # print image.file_name + ' -> ' + str(thumbnail_size) + ', ' + str(detail_size)
            #     # image.save_thumbnail("../assets/thumbnails/", thumbnail_size)
            #     # image.save_thumbnail("../assets/details/", detail_size)
            # print ids
            # data = json.dumps(ids)            
            # f.write(data)
            # f.close()
        finally:
            conn.close()
    else:
        print "Error connecting"


def get_longest(img):
    if img.size_y > img.size_x:
        longest = (350 * img.size_y) / img.size_x
    else:
        longest = (350 * img.size_x) / img.size_y
    return int(math.ceil(longest))


def get_longest_detail(img):
    if img.size_y > img.size_x:
        longest = (700 * img.size_y) / img.size_x
    else:
        longest = 700
    return int(math.ceil(longest))


def changeColors(img):
    channels = img.getChannels()
    chs = [1, 2, 3, 4]
    colorList = ['0000FF', 'FF0000', '00FF00', 'FFFFFF']
    img.setActiveChannels(chs, colors=colorList)
    img.saveDefaults()
    # for chan in channels:
    #     # print chan.getName() + ' -> ' + chan.getColor().getHtml()
    #     ch = conn.getObject('Channel', oid=chan.getId())
    #     print ch
    #     # if chan.getName().upper() == 'DAPI':
    #     #     setColor(chan, (0, 0, 255))
    #     # elif chan.getName().upper() == 'CY2':
    #     #     setColor(chan, (255, 0, 0))
    #     # elif chan.getName().upper() == 'CY3':
    #     #     setColor(chan, (0, 255, 0))
    #     # else:
    #     #     setColor(chan, (255, 255, 255))
    #     # chan.save()
    #     # print chan.getName() + ' -> ' + chan.getColor().getHtml()

def setColor(chan, color):
    chan.getColor().setRed(255)
    chan.getColor().setGreen(0)
    chan.getColor().setBlue(255)
    print chan.getColor().getRGB()

save_thumbs()