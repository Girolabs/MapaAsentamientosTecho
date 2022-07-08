from django.urls import re_path, include
from rest_framework import routers
from main import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'asentamiento', views.AsentamientoViewSet)


urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^mapa/$', views.mapa, name='mapa'),
    re_path(r'^datos/$', views.datos, name='datos'),
    re_path(r'^metodologia/$', views.metodologia, name='metodologia'),
     re_path(r'^graficos/$', views.graficos, name='graficos'),
      re_path(r'^graficos-barras/$', views.graficosBarra, name='graficosBarra'),
     
       re_path(r'^burbuja/$', views.burbuja, name='burbuja'),
     re_path(r'^descarga-asentamientos/$', views.descargaAsentamientos, name='descargaAsentamientos'),
     #url(r'^asentamiento/$', views.AsentamientoViewSet.as_view()),

     re_path(r'^', include(router.urls)),
    re_path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]
