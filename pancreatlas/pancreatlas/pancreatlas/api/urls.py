from django.conf.urls import url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()

router.register(r'images', views.ImageViewSet, base_name="pancreatlas_api")
router.register(r'datasets', views.DatasetViewset, base_name="pancreatlas_api")

urlpatterns = [
    url(r'^', include(router.urls))
]