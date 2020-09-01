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

```
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

## Datasets
This section deals with how to return information about datasets, including the desired structure and information for the FFIND frontend to work
### JSON structure

### Required API endpoints