# How to set up an API that works with FFIND
FFIND was designed to work with any type of API backend. In order to work, the FFIND backend must provide the following functionality:

1. Return metadata about a specific image
2. Return metadata about all images
3. Return metadata about a dataset
4. Return metadata for all datasets
5. Provide a list of images in a dataset

This document provides an overview of how we tackled these problems when building Pancreatlas along with relevant code samples so that you can get a FFIND installation up and running quickly.

## Images
This section deals with how to return information about images, including the desired structure and information for the FFIND frontend to work
### JSON structure
The JSON returned from the backend API must contain all of the relevant metadata for an image that is to be shown in the image display cards as well as the modal image previews--essentially, any key-value pairs associated with an image. The general structure should look something like this:

```json
 {
     "00001": [
            {
                "tagset": "Tagset 1",
                "tag": "Tag value"
            },
            {
                "tagset": "Tagset 2",
                "tag": "Tag value"
            },
            {
                "tagset": "Tagset 3",
                "tag": "Tag value"
            },
            ...
            {
                "tagset": "Tagset N",
                "tag": "Tag value"
            }
     ]
 }
```
### Required API endpoints
There should be API endpoints to list all images and to get information for a single image.
Below are sample Python implementations we used in Pancreatlas to get this set up:
#### All images
```
with open('cached image index', 'r') as f:
    data = f.readline()
    return Response(json.loads(data))
```

#### Single image
```python
    # Connect to image storage API
    img = omero_api.get_image_by_id(conn, pk)

    # Instantiate Image (from models.py) with relevant data
    ret_img = Image(pk, img.file_name, img.get_tag_names(),
                    img.get_key_values(), img.get_channel_info())

    # Return serialized image.
    serializer = ImageSerializer(ret_img)
    return Response(serializer.data)
```
## Datasets
This section deals with how to return information about datasets, including the desired structure and information for the FFIND frontend to work
### JSON structure

### Required API endpoints