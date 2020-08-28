from django.conf.urls import url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()

router.register(r'images', views.ImageViewSet, basename="ffind-api_api")
router.register(r'datasets', views.DatasetViewset, basename="ffind-api_api")
router.register(r'tagsets', views.TagsetViewset, basename="ffind-api_api")
router.register(r'matrix', views.MatrixViewset, basename="ffind-api_api")
router.register(r'users', views.UserViewset, basename="ffind-api_api")
router.register(r'feedback', views.FeedbackViewset, basename="ffind-api_api")

urlpatterns = [
    url(r'^', include(router.urls))
]