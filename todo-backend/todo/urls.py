from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r"", views.TodoViewSet)

urlpatterns = router.urls

urlpatterns += [path('order/', views.TodoViewSet.order)]