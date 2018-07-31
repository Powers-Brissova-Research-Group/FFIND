import omeropy.omero
from omeropy.omero.gateway import BlitzGateway
from helper_classes import Image, Tag, Dataset

from os.path import expanduser

tag_set = None

def connect(username, password, host, portnum=4064):
    conn = BlitzGateway(username, password, host=host, port=portnum)
    success = conn.connect()
    return (conn, success)

def get_image_by_id(conn, iid):
    return Image(conn.getObject("Image", oid=iid))

def get_images_from_ids(conn, iids):
    img_set = []
    imgs = conn.getObjects("Image", ids=iids)
    for img in imgs:
        img_set.append(Image(img))
    return img_set

def get_images_from_dataset(conn, dset):
    iids = []
    children = list(dset.wrapper.listChildren())
    # print dset.name + " has " + str(len(children)) + " children"
    for child in children:
        iids.append(child.getId())

    imgs = get_images_from_ids(conn, iids)
    # print dset.name + " has " + str(len(imgs)) + " images"
    return imgs


def get_images_union_from_tags(conn, tag_names):
    tids = map(get_tid, tag_names)
    imgs = conn.getObjectsByAnnotations("Image", tids)
    return map(Image, imgs)

# Is there a way to do this without getting the image ids first and then the images themselves? (Only making one api call)

def get_images_intersection_from_tags(conn, tag_names):
    tids = []
    lists = []
    for name in tag_names:
        tid = [tag_set[name].tid]
        tmp = list(conn.getObjectsByAnnotations("Image", tid))
        imgs = map(Image, tmp)
        for img in imgs:
            img.fetch_annotations()
        lists.append(set(imgs))
    tmp = intersect(lists)
    
    # Just returning the intersection doesn't work because for some reason that doesn't inclulde all the possible image tags
    return get_images_from_ids(conn, [i.id for i in tmp])

def save_images(img_set, directory):
    imgnames = map(gen_file_name, img_set)
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

def intersect(sets):
    result = sets[0]
    for i in range(1, len(sets)):
        result = result.intersection(sets[i])
    return list(result)

def get_tid(name):
    global tag_set
    return tag_set[name].tid

def filter_imgs_by_tag(img_set, tag_name):
    tag = tag_set[tag_name]
    filtered = [ img for img in img_set if img.has_tag(tag) ]
    return filtered

def get_datasets(conn):
    dsets = list(conn.getObjects("Dataset"))
    dset_list = [Dataset(dset) for dset in dsets]
    return dset_list

def get_dataset(conn, did):
    ds = conn.getObject("Dataset", oid=did)
    dataset = Dataset(ds)
    # dataset.imgs = get_images_from_dataset(conn, dataset)
    return dataset

def get_dataset_images(conn, did):
    dset = get_dataset(conn, did)
    dset.imgs = get_images_from_dataset(conn, dset)
    # print dset.name + " has " + str(len(dset.imgs)) + " images."
    return dset

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