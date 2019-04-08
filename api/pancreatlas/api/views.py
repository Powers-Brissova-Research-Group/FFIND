# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action

from models import Image, ImageSet, ImageId, Dataset, DatasetImages, TagSet, Matrix
from serializers import ImageSerializer, ImageSetSerializer, ImageIdSerializer, DatasetImageSerializer, DatasetSerializer, TagSetSerializer, TagsSerializer, MatrixSerializer

import requests
from requests.auth import HTTPBasicAuth

import json

from django.shortcuts import render

import omero_api

from helper_classes import TagSetI

import pprint

import collections
import os

# Create your views here.


class ImageViewSet(viewsets.ViewSet):

    def list(self, request):
        f = open('/app001/www/assets/pancreatlas/datasets/image_index.txt', 'r')
        data = f.readline()
        # ids = ids[:-1]

        # serializer = ImageIdSerializer(ImageId(ids))
        return Response(json.loads(data))

    def retrieve(self, request, pk=None):
        img = omero_api.get_image_by_id(pk)

        ret_img = Image(pk, img.file_name, "/var/www/assets/pancreatlas/thumb/" + img.file_name,
                        "/home/jmessmer/Projects/pancreatlas/api/pancreatlas/assets/details/" + img.file_name, img.get_tag_names(), img.get_key_values(), img.get_channel_info())

        serializer = ImageSerializer(ret_img)
        return Response(serializer.data)


class DatasetViewset(viewsets.ViewSet):
    def list(self, request):
        dsets = omero_api.get_datasets()
        dsets = [Dataset(dset.did, dset.name, dset.desc, dset.kvals) for dset in dsets if dset.did == 384 or dset.did == 390 or dset.did == 408]

        serializer = DatasetSerializer(dsets, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
        # ds = omero_api.get_dataset_images(pk)
        # ds.imgs = omero_api.filter_imgs_by_tag(ds.imgs, "Aperio")
        cwd = os.getcwd()
        f = open('/app001/www/assets/pancreatlas/datasets/' + str(pk) + '.txt', 'r')
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
        serializer = DatasetSerializer(Dataset(ds.did, ds.name, ds.desc, ds.kvals))
        return Response(serializer.data)


class TagsetViewset(viewsets.ViewSet):
    def list(self, request):
        tag_list = omero_api.get_tag_dictionary()
        tagsets = {
            "DISEASE": {},
            "MARKER": {},
            "SEX": {},
            "PANCREAS REGION": {},
            "AGE": {},
            "FILE TYPE": {},
            "SECTION PLANE": {}
        }

        tagset_indices = {
            "DISEASE": 0,
            "AGE": 1,
            "SEX": 2,
            "MARKER": 3,
            "PANCREAS REGION": 4,
            "SECTION PLANE": 5,
            "FILE TYPE": 6,
        }

        for name, tags in tag_list.iteritems():
            t_dict = {}
            tset = TagSetI(name, tags)
            s = tset.serialize()
            # ordered_tags = collections.OrderedDict(sorted(t_dict.items()))
            if name in tagsets:
                tagsets[name] = s
        ts = tagsets.values()
        sorted_ts = [0] * len(ts)
        for i in range(len(ts)):
            pprint.pprint(ts[i])
            if 'set_name' in ts[i]:
                idx = tagset_indices[ts[i]['set_name']]
                sorted_ts[idx] = ts[i]

        # serializer = TagSetSerializer(sorted_ts, many=True)
        # sers = [TagSetSerializer(t) for t in sorted_ts]

        return Response([ts for ts in sorted_ts if ts != 0])


class MatrixViewset(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        tags = pk.split(',')
        matrix = omero_api.generate_image_matrix_from_ds(
            tags[0].upper(), tags[1].upper(), tags[2])
        for (key, value) in matrix.iteritems():
            for (col, imgs) in value.iteritems():
                matrix[key][col] = imgs

        m = Matrix(tags[0], tags[1], matrix)

        serializer = MatrixSerializer(m)
        # pprint.pprint(matrix)

        return Response(serializer.data)

class UserViewset(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        email = data['email']

        api_data = {
            'email_address': email,
            'status': 'subscribed'
        }
        
        url = "https://us18.api.mailchimp.com/3.0/lists/eceb982b65/members"

        r = requests.post(url, json=api_data, auth=('user', '4db489c84c572b13b6846613efbf40bc-us18'))
        print r.request
        print json.loads(r.content)
        return Response(json.loads(r.content), status=r.status_code, content_type=r.headers['Content-Type'])

    def update(self, request, pk=None):
        data = request.data
        email = data['email']

        api_data = {
            'email_address': email,
            'status': 'subscribed'
        }
        
        url = "https://us18.api.mailchimp.com/3.0/lists/eceb982b65/members"

        r = requests.post(url, json=api_data, auth=('user', '4db489c84c572b13b6846613efbf40bc-us18'))
        print r.request
        print json.loads(r.content)
        return Response(json.loads(r.content), status=r.status_code, content_type=r.headers['Content-Type'])


