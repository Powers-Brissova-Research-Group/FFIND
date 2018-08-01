# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action

from models import Image, ImageSet, Dataset, DatasetImages
from serializers import ImageSerializer, ImageSetSerializer, DatasetImageSerializer, DatasetSerializer

import requests

from django.shortcuts import render

import omero_api

# Create your views here.

class ImageViewSet(viewsets.ViewSet):

    def __init__(self, *args, **kwargs):
        super(ImageViewSet, self).__init__(*args, **kwargs)
        (conn, success) = omero_api.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
        if success == True:
            self.omero_conn = conn
            omero_api.fetch_tags(self.omero_conn)
        else :
            raise SystemError("Connection to OMERO failed")

    def list(self, request):
        imgs = omero_api.get_images_from_dataset(self.omero_conn, "Full no copy")
        imgs = omero_api.filter_imgs_by_tag(imgs, "Aperio")

        imgs = [Image(img.id, img.file_name, "assets/thumbnails/" + img.file_name, img.get_tag_names(), img.get_key_values()) for img in imgs]

        img_serializer = ImageSerializer(imgs, many=True)

        ret_imgs = ImageSet("full no copy aperio", len(imgs), img_serializer.data)

        serializer = ImageSetSerializer(ret_imgs)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        img = omero_api.get_image_by_id(self.omero_conn, pk)

        ret_img = Image(pk, img.file_name, "assets/thumbnails/" + img.file_name, img.get_tag_names(), img.get_key_values())

        serializer = ImageSerializer(ret_img)
        return Response(serializer.data)

class DatasetViewset(viewsets.ViewSet):
    def __init__(self, *args, **kwargs):
        super(DatasetViewset, self).__init__(*args, **kwargs)
        (conn, success) = omero_api.connect('api.user', 'ts6t6r1537k=', '10.152.140.10')
        if success == True:
            self.omero_conn = conn
            omero_api.fetch_tags(self.omero_conn)
        else :
            raise SystemError("Connection to OMERO failed")        

    def list(self, request):
        dsets = omero_api.get_datasets(self.omero_conn)
        dsets = [Dataset(dset.did, dset.name) for dset in dsets]

        serializer = DatasetSerializer(dsets, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
        ds = omero_api.get_dataset_images(self.omero_conn, pk)
        # ds.imgs = omero_api.filter_imgs_by_tag(ds.imgs, "Aperio")

        imgs = [Image(img.id, img.file_name, "assets/thumbnails/" + img.file_name, img.get_tag_names(), img.get_key_values()) for img in ds.imgs]

        img_serializer = ImageSerializer(imgs, many=True)

        ret_imgs = DatasetImages("full no copy aperio", len(imgs), img_serializer.data)

        serializer = DatasetImageSerializer(ret_imgs)
        return Response(serializer.data)

    
    def retrieve(self, request, pk=None):
        ds = omero_api.get_dataset(self.omero_conn, pk)
        # ds.imgs = omero_api.filter_imgs_by_tag(ds.imgs, "Aperio")

        # imgs = [Image(img.id, img.file_name, "assets/thumbnails/" + img.file_name, img.get_tag_names(), img.get_key_values()) for img in ds.imgs]

        # img_serializer = ImageSerializer(imgs, many=True)

        # ret_imgs = DatasetImages(ds.name, len(imgs), img_serializer.data)
        
        serializer = DatasetSerializer(Dataset(ds.did, ds.name))
        return Response(serializer.data)


