# How to set up an API that works with FFIND
FFIND was designed to work with any type of API backend. In order to work, the FFIND backend must provide the following functionality:

1. [Return Metadata About a Single Image](#return-metadata-about-a-single-image)
2. [Return Metadata About All Images](#return-metadata-about-all-images)
3. [Return Metadata About a Single Dataset](#return-metadata-about-a-single-dataset)
4. [Return Metadata About All Datasets](#return-metadata-about-all-datasets)
5. [Provide a List of Images and Metadata in a Dataset](#provide-a-list-of-images-and-metadata-in-a-dataset)

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
            /* ... */
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

#### Return Metadata About a Single Image
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

#### Return Metadata About All Images
```
with open('cached image index', 'r') as f:
    data = f.readline()
    return Response(json.loads(data))
```
## Datasets
This section deals with how to return information about datasets, including the desired structure and information for the FFIND frontend to work
### JSON structure
For the datasets, we need both the structure for returning metadata about a specific dataset and all of the images in a dataset to build our filtering menu.

For dataset metadata, use the following structure:
```json
{
    "did": 101,
    "dsname": "Name of the dataset",
    "desc": "A short description of what the dataset is about",
    "kvals": {
        "active": "true|false",
        "img_count": "number of images in dataset",
        "description_long": "Long description with detailed information about the dataset",
        "description_short": "Short description",
        "title_image": {
            "url": "https://example.com",
            "src": "title-image.jpg"
        },
        "import_date": "Date of data import",
        "publish_date": "Date of data publish"
    }
}
```

And for images in a dataset, use this structure:
```json
{
    "images": 
    {
        "image id": 
        [
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
            /* ... */
            {
                "tagset": "Tagset N",
                "tag": "Tag value"
            }
     ]
    },
    "filters": 
    [
        {
            "set_name": "Name",
            "tags":
            {
                "value 1": 0,
                "value 2": 0,
                /* ... */
                "value n": 0
            },
            "pos": 0 /* Position in list of filters */
        },
        /* ... */
                {
            "set_name": "Name",
            "tags":
            {
                "value 1": 0,
                "value 2": 0,
                /* ... */
                "value n": 0
            },
            "pos": 0 /* Position in list of filters */
        }
    ]
}
```

### Required API endpoints
There should be API endpoints to list all datasets, to get information for a single dataset, and to get images and filters for a dataset.
Below are sample Python implementations we used in Pancreatlas to get this set up:

#### Return Metadata About a Single Dataset
```python
# Connect to image storage API
ds = omero_api.get_dataset(conn, pk)

# Make sure the dataset exists
if ds == None:
    return Response({})
else:
# Return serialized response 
    serializer = DatasetSerializer(
        Dataset(ds.did, ds.name, ds.desc, ds.kvals))
    return Response(serializer.data)
```

#### Return Metadata About All Datasets
```python
# Create array of all datasets from image storage API
dsets = [Dataset(dset.did, dset.name, dset.desc, dset.kvals)
                    for dset in omero_api.get_private_datasets(conn)]

# Return serialized response
serializer = DatasetSerializer(dsets, many=True)
return Response(serializer.data)

```


#### Provide a List of Images and Metadata in a Dataset:
```python
with open('dataset cache file') as f:
    data = f.readline()
    return Response(json.loads(data))

```
