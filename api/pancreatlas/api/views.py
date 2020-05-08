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
from omeropy.omero.gateway import BlitzGateway

from helper_classes import TagSetI

import pprint

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
        with open('/app001/www/assets/pancreatlas/datasets/image_index.txt', 'r') as f:
            data = f.readline()
            return Response(json.loads(data))

    def retrieve(self, request, pk=None):
        conn = BlitzGateway('api.user', 'ts6t6r1537k=',
                            host='10.152.140.10', port=4064)
        try:
            conn.connect()
            img = omero_api.get_image_by_id(conn, pk)
            ret_img = Image(pk, img.file_name, img.get_tag_names(),
                            img.get_key_values(), img.get_channel_info())
            serializer = ImageSerializer(ret_img)
            return Response(serializer.data)
        finally:
            try:
                conn.close(hard=False)
            except:
                logger.warning("Failed to close OMERO connection")


class DatasetViewset(viewsets.ViewSet):
    def list(self, request):
        conn = BlitzGateway('api.user', 'ts6t6r1537k=',
                            host='10.152.140.10', port=4064)
        try:
            conn.connect()
            dsets = [Dataset(dset.did, dset.name, dset.desc, dset.kvals)
                             for dset in omero_api.get_private_datasets(conn)]
            serializer = DatasetSerializer(dsets, many=True)
            return Response(serializer.data)

        finally:
            try:
                conn.close(hard=False)
            except:
                logger.warning("Failed to close OMERO connection")

    @action(methods=['get'], detail=True, url_path='get-images', url_name='get_images')
    def get_images(self, request, pk=None):
        with open('/app001/www/assets/pancreatlas/datasets/' + str(pk) + '.txt') as f:
            data = f.readline()
            return Response(json.loads(data))

    @action(methods=['get'], detail=True, url_path='get-tags', url_name='get_tags')
    def get_tags(self, request, pk=None):
        filters = {}
        filter_order = {
            'DISEASE STATUS': 0,
            'DISEASE DURATION': 1,
            'AGE': 2,
            'SEX': 3,
            'PROGRAM ID': 4,
            'MARKER': 5,
            'PANCREAS REGION': 6,
            'MODALITY': 7
        }
        with open('/app001/www/assets/pancreatlas/datasets/' + str(pk) + '.txt', 'r') as f:
            data = json.loads(f.readline())
            for key, val in data.items():
                for fil in val:
                    filter_group = fil['tagset'].upper()
                    root_group = filter_group.split('-')[0]
                    filter_name = fil['tag']
                    if filter_group not in filters:
                        filters[filter_group] = {
                            'set_name': filter_group, 'tags': {}, 'pos': filter_order[root_group]}
                    fset = filters[filter_group]
                    fset['tags'][filter_name] = 0
            sorted_filters = sorted(
                filters.values(), key=lambda fil: fil['pos'])
            return Response(sorted_filters)

    def retrieve(self, request, pk=None):
        conn = BlitzGateway('api.user', 'ts6t6r1537k=',
                            host='10.152.140.10', port=4064)
        try:
            conn.connect()
            ds = omero_api.get_dataset(conn, pk)
            if ds == None:
                return Response({})
            else:
                serializer = DatasetSerializer(
                    Dataset(ds.did, ds.name, ds.desc, ds.kvals))
                return Response(serializer.data)
        finally:
            try:
                conn.close(hard=False)
            except:
                logger.warning("Failed to close OMERO connection")


class TagsetViewset(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        taglist = {}
        arr = []
        with open('/app001/www/assets/pancreatlas/datasets/' + str(pk) + '.txt', 'r') as f:
            imgs = json.loads(f.readline())
            for (img_id, img_tags) in imgs.iteritems():
                for t in img_tags:
                    tagset = t['tagset']

                    # Putting in a check for age, since we append extra information for those
                    # tags based on age sub groups
                    if tagset.upper().startswith('AGE'):
                        tagset = 'AGE'
                    tag = t['tag']
                    if tagset not in taglist:
                        taglist[tagset] = {}
                    print "%s -> %s" % (tagset, tag)
                    taglist[tagset][tag] = 0
        for key in taglist.keys():
            obj = {'set_name': key.upper(), 'tags': taglist[key]}
            arr.append(obj)
        return Response(arr)


class MatrixViewset(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        tags = pk.split(',')
        matrix = omero_api.generate_image_matrix_from_ds(tags[0].upper(), tags[1].upper(), tags[2])
        m = Matrix(tags[0], tags[1], matrix)
        serializer = MatrixSerializer(m)
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

        r = requests.post(url, json=api_data, auth=(
            'user', '4db489c84c572b13b6846613efbf40bc-us18'))
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

        email_hash = hashlib.md5(email).hexdigest()

        url = "https://us18.api.mailchimp.com/3.0/lists/eceb982b65/members/" + email_hash

        r = requests.put(url, json=api_data, auth=(
            'user', '4db489c84c572b13b6846613efbf40bc-us18'))
        print r.request
        print json.loads(r.content)
        return Response(json.loads(r.content), status=r.status_code, content_type=r.headers['Content-Type'])


class FeedbackViewset(viewsets.ViewSet):
    def list(self, request):
        if 'feedback-sent' in request.COOKIES:
            return Response('Feedback already recorded')
        else:
            response = Response('Feedback noted successfully')
            response.set_cookie('feedback-sent', 'true', max_age=31536000000, domain='.app.vumc.org')
            return response
