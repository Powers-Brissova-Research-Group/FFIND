from rest_framework import serializers
from models import Image

class ImageSerializer(serializers.Serializer):
    iid = serializers.IntegerField()
    iname = serializers.CharField(max_length=50)
    thumbpath = serializers.CharField(max_length=128)
    detailpath = serializers.CharField(max_length=128)
    pathpath = serializers.CharField(max_length=128)
    tags = serializers.ListField()
    kvals = serializers.DictField(child=serializers.CharField())

class ImageSetSerializer(serializers.Serializer):
    setname = serializers.CharField(max_length=50)
    setlength = serializers.IntegerField()
    imgs = serializers.ListField()

class DatasetImageSerializer(serializers.Serializer):
    dsetname = serializers.CharField(max_length=50)
    dsetlength = serializers.IntegerField()
    imgs = serializers.ListField()

class DatasetSerializer(serializers.Serializer):
    did = serializers.IntegerField()
    dsname = serializers.CharField(max_length=50)

class TagSetSerializer(serializers.Serializer):
    set_name = serializers.CharField(max_length=50)
    tags = serializers.ListField()

class MatrixSerializer(serializers.Serializer):
    tag_a = serializers.CharField(max_length=50)
    tag_b = serializers.CharField(max_length=50)
    matrix = serializers.DictField(child=serializers.DictField(child=serializers.ListField()))