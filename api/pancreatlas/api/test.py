import omero_api

mtrx = omero_api.generate_image_matrix_from_ds('AGE', 'MARKER', 384)
print mtrx
