import omero_api as api

def save_thumbs():
    (conn, success) = api.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
    if success:
        try:
            api.fetch_tags(conn)
            images = api.get_images_union_from_tags(conn, ["Aperio"])
            for image in images:
                print image.file_name
                image.save_thumbnail("assets/thumbnails/", (350, 350))
        finally:
            conn.close()
    else:
        print "Error connecting"

save_thumbs()