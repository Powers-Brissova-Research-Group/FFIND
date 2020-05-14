from omero.gateway import ImageWrapper
import api.omero_api as oapi

(conn, success) = oapi.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')

if success:
    try:
        oapi.fetch_tags(conn)
        dsets = oapi.get_datasets(conn)
        dsnames = [dset.name for dset in dsets]
        print dsnames
    finally:
        conn.close()