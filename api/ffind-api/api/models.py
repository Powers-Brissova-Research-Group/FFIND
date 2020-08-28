# -*- coding: utf-8 -*-


from django.db import models

# Create your models here.

class Image():
    def __init__(self, iid, iname, external_path, tags, kvals, channel_info):
        self.iid = iid
        self.iname = iname
        self.external_path = external_path
        self.tags = tags
        self.kvals = kvals

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
