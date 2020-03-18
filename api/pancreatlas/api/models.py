# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Image():
    def __init__(self, iid, iname, blurhash, tags, kvals, channel_info):
        self.iid = iid
        self.iname = iname
        self.pathpath = "https://omero.app.vumc.org/pathviewer/viewer/#?slide=" + str(iid) + "&q_image=" + str(iid) + "&tabs=VDp"
        self.blurhash = blurhash
        self.tags = tags
        self.kvals = kvals
        self.channel_info = channel_info

class ImageSet():
    def __init__(self, setname, setlength, imgs):
        self.setname = setname
        self.setlength = setlength
        self.imgs = imgs

class ImageId():
    def __init__(self, iids):
        self.iids = iids

class Dataset():
    def __init__(self, did, dsname, desc, kvals):
        self.did = did
        self.dsname = dsname
        self.desc = desc
        self.kvals = kvals
class DatasetImages():
    def __init__(self, dsetname, dsetlength, imgs):
        self.dsetname = dsetname
        self.dsetlength = dsetlength
        self.imgs = imgs
class TagSet():
    def __init__(self, set_name, tags):
        self.set_name = set_name
        self.tags = tags

class Matrix():
    def __init__(self, tag_a, tag_b, matrix):
        self.tag_a = tag_a
        self.tag_b = tag_b
        self.matrix = matrix
