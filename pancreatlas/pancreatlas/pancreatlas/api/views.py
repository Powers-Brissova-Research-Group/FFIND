# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action

from models import Image, ImageSet, ImageId, Dataset, DatasetImages, TagSet, Matrix
from serializers import ImageSerializer, ImageSetSerializer, ImageIdSerializer, DatasetImageSerializer, DatasetSerializer, TagSetSerializer, MatrixSerializer

import requests

import json

from django.shortcuts import render

import omero_api

import pprint

# Create your views here.


class ImageViewSet(viewsets.ViewSet):

    def list(self, request):
        f = open('api/image_ids.txt', 'r')
        data = f.readline()
        # ids = ids[:-1]

        # serializer = ImageIdSerializer(ImageId(ids))
        return Response(json.loads(data))

    def retrieve(self, request, pk=None):
        img = omero_api.get_image_by_id(pk)

        ret_img = Image(pk, img.file_name, "assets/thumbnails/" + img.file_name,
                        "assets/details/" + img.file_name, img.get_tag_names(), img.get_key_values())

        serializer = ImageSerializer(ret_img)
        return Response(serializer.data)


class DatasetViewset(viewsets.ViewSet):
    def list(self, request):
        dsets = omero_api.get_datasets()
        dsets = [Dataset(dset.did, dset.name) for dset in dsets]

        serializer = DatasetSerializer(dsets, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
        # ds = omero_api.get_dataset_images(pk)
        # ds.imgs = omero_api.filter_imgs_by_tag(ds.imgs, "Aperio")
        f = open('api/' + str(pk) + '.txt', 'r')
        data = f.readline()
        # imgs = [Image(img.id, img.file_name, "assets/thumbnails/" + img.file_name, "assets/details/" +
        #               img.file_name, img.get_tag_names(), img.get_key_values()) for img in ds.imgs]

        # img_serializer = ImageSerializer(imgs, many=True)

        # ret_imgs = DatasetImages(
        #     "full no copy aperio", len(imgs), img_serializer.data)

        # serializer = DatasetImageSerializer(ret_imgs)
        return Response(json.loads(data))

    def retrieve(self, request, pk=None):
        ds = omero_api.get_dataset(pk)
        serializer = DatasetSerializer(Dataset(ds.did, ds.name))
        return Response(serializer.data)


class TagsetViewset(viewsets.ViewSet):
    def list(self, request):
        tag_list = omero_api.get_tag_dictionary()
        tagsets = []
        for name, tags in tag_list.iteritems():
            tagsets.append(TagSet(name, [tag.tname for tag in tags]))

        serializer = TagSetSerializer(tagsets, many=True)

        return Response(serializer.data)


class MatrixViewset(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        tags = pk.split(',')
        print tags
        matrix = omero_api.generate_image_matrix(
            tags[0].upper(), tags[1].upper())
        for (key, value) in matrix.iteritems():
            for (col, imgs) in value.iteritems():
                img_list = [Image(img.id, img.file_name, "assets/thumbnails/" + img.file_name, "assets/details/" +
                                  img.file_name, img.get_tag_names(), img.get_key_values()) for img in matrix[key][col]]
                img_ser = ImageSerializer(img_list, many=True)
                matrix[key][col] = img_ser.data

        m = Matrix(tags[0], tags[1], matrix)

        serializer = MatrixSerializer(m)
        # pprint.pprint(matrix)

        return Response(serializer.data)
