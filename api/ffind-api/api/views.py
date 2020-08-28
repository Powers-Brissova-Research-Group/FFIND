# -*- coding: utf-8 -*-


from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Image, ImageSet, ImageId, Dataset, DatasetImages, TagSet
from .serializers import ImageSerializer, ImageSetSerializer, ImageIdSerializer, DatasetImageSerializer, DatasetSerializer, TagSetSerializer, TagsSerializer

import requests
from requests.auth import HTTPBasicAuth

import json

from django.shortcuts import render

import collections
import os

import hashlib
import logging

FORMAT = '%(asctime)-15s %(clientip)s %(user)-8s %(message)s'
logging.basicConfig(format=FORMAT)
logger = logging.getLogger('pancreatlas_api')

# Create your views here.


class ImageViewSet(viewsets.ViewSet):

    def list(self, request):
        # Use this method to return a list of all images in your project
        return

    def retrieve(self, request, pk=None):
        # Fill in with code to return data associated with a given image
        ret_img = None

        return Response(ImageSerializer(ret_img))



class DatasetViewset(viewsets.ViewSet):
    def list(self, request):
        # Find all datasets
        # dsets = [Dataset(dset.did, dset.name, dset.desc, dset.kvals) for dset in]

        serializer - DatasetSerializer(dsets, many=True)

        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
        # return all images in a dataset


    @action(methods=['get'], detail=True, url_path='get-tags', url_name='get_tags')
    def get_tags(self, request, pk=None):

        # Return all filter sets associated with a dataset


    def retrieve(self, request, pk=None):
        
        # Return metadata associated wtih dataset

        return Response(DatasetSerializer(dataset.did, dataset.name, dataset.desc, dataset.kvals))

