from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.Serializer):
    iid = serializers.IntegerField()
    iname = serializers.CharField(max_length=50)
    pathpath = serializers.CharField(max_length=128)
    tags = serializers.ListField()
    kvals = serializers.DictField(child=serializers.DictField())
    channel_info = serializers.DictField(child=serializers.CharField(max_length=64))

class ImageSetSerializer(serializers.Serializer):
    setname = serializers.CharField(max_length=50)
    setlength = serializers.IntegerField()
    imgs = serializers.ListField()

class ImageIdSerializer(serializers.Serializer):
    iids = serializers.ListField()

class DatasetImageSerializer(serializers.Serializer):
    dsetname = serializers.CharField(max_length=50)
    dsetlength = serializers.IntegerField()
    imgs = serializers.ListField()

class DatasetSerializer(serializers.Serializer):
    did = serializers.IntegerField()
    dsname = serializers.CharField(max_length=50)
    desc = serializers.CharField(max_length=256)
    kvals = serializers.DictField()

class TagSetSerializer(serializers.Serializer):
    set_name = serializers.CharField(max_length=50)
    tags = serializers.DictField()

class TagsSerializer(serializers.Serializer):
    tagsets = serializers.DictField()

class MatrixSerializer(serializers.Serializer):
    tag_a = serializers.CharField(max_length=50)
    tag_b = serializers.CharField(max_length=50)
    matrix = serializers.DictField(child=serializers.DictField(child=serializers.ListField()))
