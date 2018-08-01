import omero_api as api
import math

def save_thumbs():
    (conn, success) = api.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
    if success:
        try:
            api.fetch_tags(conn)
            images = api.get_images_union_from_tags(conn, ["Aperio", "Leica", "Zeiss"])
            for image in images:
                longest_size = get_longest(image)
                print image.file_name + ' -> ' + str(longest_size)
                image.save_thumbnail("../assets/thumbnails/", longest_size)
        finally:
            conn.close()
    else:
        print "Error connecting"

def get_longest(img):
    longest = 350
    if img.size_y > img.size_x:
        longest = (350 * img.size_y) / img.size_x
    else:
        longest = (350 * img.size_x) / img.size_y
    return int(math.ceil(longest))

save_thumbs()