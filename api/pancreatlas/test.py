import api.omero_api as api

img = api.get_image_by_id(16777)
print img.id
