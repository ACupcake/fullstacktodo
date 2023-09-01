from django.urls import path
from . import viewsets
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r"", viewsets.TodoViewSet)

urlpatterns = router.urls

urlpatterns += [path('order/', viewsets.TodoViewSet.order)]