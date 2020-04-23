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
            serializer = DatasetSerializer(
                Dataset(ds.did, ds.name, ds.desc, ds.kvals))
            return Response(serializer.data)
        finally:
            try:
                conn.close(hard=False)
            except:
                logger.warning("Failed to close OMERO connection")


class TagsetViewset(viewsets.ViewSet):
    def list(self, request):
        js = json.loads('[{"set_name":"DISEASE STATUS","tags":{"AAB":0,"CF":0,"CFRD":0,"CP":0,"ND":0,"T1D":0,"T2D":0}},{"set_name":"DISEASE DURATION","tags":{"1y":0,"10y":0,"14y":0,"18y":0,"2y":0,"3y":0,"4y":0,"5y":0,"7y":0,"8y":0}},{"set_name":"AGE","tags":{"0d":0,"29d":0,"4d":0,"8d":0,"G12w":0,"G12.3w":0,"G15w":0,"G17w":0,"G17.3w":0,"1d":0,"5d":0,"G15.5w":0,"G18w":0,"G8w":0,"10mo":0,"13mo":0,"15mo":0,"18mo":0,"19mo":0,"2mo":0,"20mo":0,"21mo":0,"3mo":0,"4mo":0,"10y":0,"13y":0,"14y":0,"17y":0,"18y":0,"19y":0,"2y":0,"20y":0,"22y":0,"23y":0,"24y":0,"25y":0,"26y":0,"28y":0,"29y":0,"3y":0,"30y":0,"31y":0,"34y":0,"35y":0,"39y":0,"4y":0,"42y":0,"43y":0,"46y":0,"47y":0,"5y":0,"55y":0,"6y":0,"65y":0,"7y":0,"8y":0,"9y":0}},{"set_name":"SEX","tags":{"F":0,"M":0,"Unknown":0}},{"set_name":"MARKER","tags":{"ACTB":0,"AMY1A":0,"CA2":0,"CD11b":0,"CD11C":0,"CD14":0,"CD15":0,"CD20":0,"CD3":0,"CD31":0,"CD31 (DAB)":0,"CD34":0,"CD4":0,"CD44":0,"CD45":0,"CD45RO":0,"CD46":0,"CD47":0,"CD48":0,"CD49":0,"CD56":0,"CD57":0,"CD68":0,"CD8":0,"CD90":0,"CD99":0,"CDH1":0,"COL":0,"COL4":0,"COL4A1":0,"Congo Red":0,"CPA1":0,"CPEP":0,"DAPI":0,"DNA":0,"Eosin":0,"FOXA2":0,"FOXP3":0,"GCG":0,"GHRL":0,"GITR":0,"GP2":0,"GZMB":0,"H&E":0,"Hematoxylin":0,"HLA-ABC":0,"HLA-DR":0,"HNF1B":0,"INS":0,"INS (DAB)":0,"Ki67":0,"Ki67 (DAB)":0,"KRT":0,"NES":0,"NEUROG3":0,"NFkB":0,"NKX6-1":0,"ONECUT1":0,"PAX6":0,"PDX1":0,"PECAM1":0,"PPY":0,"pS6":0,"PTF1A":0,"SCG3":0,"SMA":0,"SOX9":0,"SST":0,"Sst":0,"SYN1":0,"SYN2":0,"SYP":0,"TUNEL":0,"VIM":0}},{"set_name":"PANCREAS REGION","tags":{"Body":0,"Core":0,"depth 1":0,"depth 2":0,"depth 3":0,"Head":0,"Periphery":0,"Tail":0,"Unknown":0}},{"set_name":"SECTION PLANE","tags":{"Sagittal":0,"Transverse":0}},{"set_name":"FILE TYPE","tags":{"AFI":0,"LIF":0,"LSM":0,"SVS":0}}]')
        return Response(js)


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
