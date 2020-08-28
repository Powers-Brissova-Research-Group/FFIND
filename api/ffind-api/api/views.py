# -*- coding: utf-8 -*-


from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Image, ImageSet, ImageId, Dataset, DatasetImages
from .serializers import ImageSerializer, ImageSetSerializer, ImageIdSerializer, DatasetImageSerializer, DatasetSerializer

import requests
from requests.auth import HTTPBasicAuth

import json

from django.shortcuts import render

import collections
import os

import hashlib
import logging

# Create your views here.


class ImageViewSet(viewsets.ViewSet):

    def list(self, request):
        """ Returns a list of all images in the application"""
        return

    def retrieve(self, request, pk=None):
        """ Return information for a specific image """
        return Response(ImageSerializer(image))


class DatasetViewset(viewsets.ViewSet):
    """ Return list of all images """
        dsets = [Dataset(dset.did, dset.name, dset.desc, dset.kvals)
                        for dset in omero_api.get_private_datasets(conn)]
        serializer = DatasetSerializer(dsets, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
    """ Get images for a given dataset """


    @action(methods=['get'], detail=True, url_path='get-tags', url_name='get_tags')
    def get_tags(self, request, pk=None):
        """ Get the filters and filter sets associated with a dataset """


    def retrieve(self, request, pk=None):
        """ Retrieve metadata for a specific dataset """
        serializer = DatasetSerializer(Dataset(ds.did, ds.name, ds.desc, ds.kvals))
        return Response(serializer.data)