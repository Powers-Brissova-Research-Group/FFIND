import signal
import omero
from omero.gateway import BlitzGateway
from .helper_classes import Image, Tag, Dataset
import os
from os.path import expanduser
import pprint
import json
import logging

tag_set = None
conn = None 
logging.basicConfig()
def connect(username, password, host, portnum=4064):
    global conn
    c = BlitzGateway(username, password, host=host, port=portnum)
    success = c.connect()
    if success == False:
        print("LAST ERROR: %s" % (c.getLastError()))
    # c.SERVICE_OPTS.setOmeroGroup(153)
    conn = c
    return (conn, success)

def get_image_by_id(conn, iid):
    img = conn.getObject("Image", oid=iid)
    if img == None:
        return None
    else:
        return Image(img)

def get_images_from_ids(conn, iids):
    img_set = []
    imgs = conn.getObjects("Image", ids=iids)
    for img in imgs:
        if img != None:
            image = Image(img)
            if '[label image]' not in image.name and '[macro image]' not in image.name:
                img_set.append(image)
    return img_set

def get_all_images(conn):
    imgs = list(conn.getObjects("Image"))
    return [Image(img) for img in imgs]

def get_images_from_dataset(conn, dsid):
    iids = []
    dset = get_dataset(conn, dsid)
    children = list(dset.wrapper.listChildren())
    for child in children:
        iids.append(child.getId())
    imgs = get_images_from_ids(conn, iids)
    print(dset.name + " has " + str(len(imgs)) + " images")
    return imgs

def get_images_union_from_tags(conn, tag_names, dsid):
    tids = list(map(get_tid, tag_names))
    imgs = conn.getObjectsByAnnotations("Image", tids)
    return get_images_from_ids([i.id for i in imgs])

# Is there a way to do this without getting the image ids first and then the images themselves? (Only making one api call)

def get_images_intersection_from_tags(conn, tag_names):
    tids = []
    lists = []
    for name in tag_names:
        tid = [tag_set[name].tid]
        tmp = list(conn.getObjectsByAnnotations("Image", tid))
        imgs = list(map(Image, tmp))
        for img in imgs:
            img.fetch_annotations()
        lists.append(set(imgs))
    tmp = intersection(lists)
    
    # Just returning the intersection doesn't work because for some reason that doesn't inclulde all the possible image tags
    return get_images_from_ids(conn, [i.id for i in tmp])

def save_images(img_set, directory):
    imgnames = list(map(gen_file_name, img_set))
    locs = [directory + '/' + x for x in imgnames ]
    for i in range(0, len(img_set)):
        img_set[i].save_thumbnail(locs[i], 256)

def gen_file_name(img):
    return img.gen_file_name()

def fetch_tags(conn):
    global tag_set

    if tag_set == None:
        tag_set = {}
        tags = conn.getObjects("TagAnnotation")
        for tag in tags:
            tag_set[tag.getValue()] = Tag(tag, tag.getId())
    
    return tag_set

def intersection(sets):
    result = sets[0]
    for i in range(1, len(sets)):
        result = result.intersection(sets[i])
    return list(result)

def intersect(sets):
    result = sets[0]
    for i in range(1, len(sets)):
        result = result.intersection(sets[i])
    intersects = len(list(result)) > 0
    return intersects

def get_tid(name):
    global tag_set
    if tag_set == None:
        tag_set = fetch_tags()
    return tag_set[name].tid

def filter_imgs_by_tag(img_set, tag_name):
    tag = tag_set[tag_name]
    filtered = [ img for img in img_set if img.has_tag(tag) ]
    return filtered

def get_datasets(conn):
    dsets = list(conn.getObjects("Dataset"))
    dset_list = [Dataset(dset) for dset in dsets]
    return dset_list

def get_active_datasets(conn):
    return [ds for ds in get_datasets(conn) if ds.active == True and ds.status <= 1]

def get_test_datasets(conn):
    return [ds for ds in get_datasets(conn) if ds.active == True and ds.status <= 2]

def get_private_datasets(conn):
    return [ds for ds in get_datasets(conn) if ds.active == True and ds.status <= 3]

def get_dataset(conn, did):
    ds = conn.getObject("Dataset", oid=did)
    if ds == None:
        return None
    else:
        dataset = Dataset(ds)
        return dataset    

def get_dataset_images(conn, did):
    dset = get_dataset(conn, did)
    dset.imgs = get_images_from_dataset(conn, dset)
    # print dset.name + " has " + str(len(dset.imgs)) + " images."
    return dset

def get_tag_dictionary(conn):
    global tag_set
    if tag_set == None:
        tag_set = fetch_tags()
    tag_dict = {}

    tags = list(conn.getObjects("TagAnnotation"))
    for tag in tags:
        for p in tag.listParents():
            if p.getValue().upper() not in tag_dict:
                tag_dict[p.getValue().upper()] = []
            tag_dict[p.getValue().upper()].append(Tag(tag, tag.getId()))
    return tag_dict
    
def generate_image_matrix(conn, tagset_a, tagset_b):
    tagsets = get_tag_dictionary(conn)
    group_a = [tag.tname for tag in tagsets[tagset_a]]
    group_b = [tag.tname for tag in tagsets[tagset_b]]
    matrix = { }
    for tag in group_a:
        matrix[tag] = { }
        for t in group_b:
            matrix[tag][t] = []
    # print matrix
    images_a = get_images_union_from_tags(conn, group_a)
    images_b = get_images_union_from_tags(conn, group_b)
    # # print intersect([set(images_a[0].get_tag_names()), set(group_b)])
    images_a = [img for img in images_a if intersect([set(img.get_tag_names()), set(group_b)])]
    images_b = [img for img in images_b if intersect([set(img.get_tag_names()), set(group_a)])]

    for img in images_a:
        a_tag = intersection([set(img.get_tag_names()), set(group_a)])[0]
        b_tag = intersection([set(img.get_tag_names()), set(group_b)])[0]
        matrix[a_tag][b_tag].append(img)

    for img in images_b:
        a_tag = intersection([set(img.get_tag_names()), set(group_a)])[0]
        b_tag = intersection([set(img.get_tag_names()), set(group_b)])[0]
        matrix[a_tag][b_tag].append(img)

    return matrix


def generate_image_matrix_from_ds(tagset_a, tagset_b, dsid):
    matrix = { }
    with open("/app001/www/assets/pancreatlas/datasets/%s.txt" % (str(dsid), ), 'r') as f:
        json_str = f.readline()

        imgs = json.loads(json_str)

        for (img_id, img_tags) in imgs.items():
            a_tags = [img['tag'] for img in img_tags if img['tagset'].upper().startswith(tagset_a)]
            b_tags = [img['tag'] for img in img_tags if img['tagset'].upper().startswith(tagset_b)]
            if(len(a_tags) > 0 and len(b_tags) > 0):
                for a_tag in a_tags:
                    if a_tag not in matrix:
                        matrix[a_tag] = {}
                    for b_tag in b_tags:
                        if b_tag not in matrix[a_tag]:
                            matrix[a_tag][b_tag] = []
                        matrix[a_tag][b_tag].append(str(img_id))

    return matrix

    # # print matrix
    # images = get_images_from_dataset_cache(group_a)
    # images_b = get_images_union_from_tags(group_b)
    # # # print intersect([set(images_a[0].get_tag_names()), set(group_b)])
    # images_a = [img for img in images_a if intersect([set(img.get_tag_names()), set(group_b)])]
    # images_b = [img for img in images_b if intersect([set(img.get_tag_names()), set(group_a)])]

    # for img in images_a:
    #     a_tag = intersection([set(img.get_tag_names()), set(group_a)])[0]
    #     b_tag = intersection([set(img.get_tag_names()), set(group_b)])[0]
    #     matrix[a_tag][b_tag].append(img)

    # for img in images_b:
    #     a_tag = intersection([set(img.get_tag_names()), set(group_a)])[0]
    #     b_tag = intersection([set(img.get_tag_names()), set(group_b)])[0]
    #     matrix[a_tag][b_tag].append(img)

    # return matrix


# def main():
#     conn, success = connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
#     print "Connected: " + str(success)
#     try:
#         tags = fetch_tags(conn)     
#         global tag_set   
#         imgs = get_images_intersection_from_tags(conn, ["F", "Aperio"])
#         print imgs[0].get_tags()
#         print len(imgs)
#         imgs = filter_imgs_by_tag(imgs, tag_set["Body"])
#         print len(imgs)
#     finally:
#         conn.close()

# if __name__=="__main__":
#     main()