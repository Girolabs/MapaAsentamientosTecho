from django.conf.urls import url,include

from . import views


from django.conf.urls import url, include
from rest_framework import routers
from main import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'asentamiento', views.AsentamientoViewSet)


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^mapa$', views.mapa, name='mapa'),
    url(r'^datos$', views.datos, name='datos'),
     #url(r'^asentamiento/$', views.AsentamientoViewSet.as_view()),

     url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]
