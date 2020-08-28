from django.conf.urls import url, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()

router.register(r'images', views.ImageViewSet, basename="pancreatlas_api")
router.register(r'datasets', views.DatasetViewset, basename="pancreatlas_api")
router.register(r'tagsets', views.TagsetViewset, basename="pancreatlas_api")
router.register(r'matrix', views.MatrixViewset, basename="pancreatlas_api")
router.register(r'users', views.UserViewset, basename="pancreatlas_api")
router.register(r'feedback', views.FeedbackViewset, basename="pancreatlas_api")

urlpatterns = [
    url(r'^', include(router.urls))
]