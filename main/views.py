import decimal
from django.shortcuts import render

from django.http import HttpResponse

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from main.serializers import UserSerializer, GroupSerializer, AsentamientoSerializer
from main.models import Asentamiento

from rest_framework import filters
from django.db.models import Count, Sum

import json
from constance import config
from main.admin import AsentamientoResource

class DecimalEncoder(json.JSONEncoder):
    def _iterencode(self, o, markers=None):
        if isinstance(o, decimal.Decimal):
            # wanted a simple yield str(o) in the next line,
            # but that would mean a yield on the line with super(...),
            # which wouldn't work (see my comment below), so...
            return (str(o) for o in [o])
        return super(DecimalEncoder, self)._iterencode(o, markers)



def index(request):
    
    ciudades = Asentamiento.objects.values("ciudad").annotate(total=Count('ciudad'), numero_aprox_viviendas_precarias=Sum('numero_aprox_viviendas_precarias'))
    #asentamiento = serializers.serialize('json',Asentamiento.objects.all())
    asentamiento = json.dumps(list(ciudades), cls=DecimalEncoder)
    context = {'asentamiento':asentamiento, 'config': config}
    return render(request = request, template_name = 'index.html', context = context)



def mapa(request):
    context = {'config': config}
    return render(request = request, template_name = 'mapa.html', context = context)



def metodologia(request):
    context = {'config': config}
    return render(request = request, template_name = 'metodologia.html', context = context)
def graficos(request):
    context = {'config': config}
    return render(request = request, template_name = 'graficos.html', context = context)

def graficosBarra(request):
    context = {'config': config}
    return render(request = request, template_name = 'graficos-barras.html', context = context)

def burbuja(request):
    context = {'config': config}
    return render(request = request, template_name = 'burbuja.html', context = context)



def datos(request):
    context = {'config': config}
    return render(request = request, template_name = 'datos.html', context = context)


def descargaAsentamientos(request):
   
    dataset = AsentamientoResource().export()
    response = HttpResponse(dataset.csv, content_type="csv")
    response['Content-Disposition'] = 'attachment; filename=asentamientos.csv'
    return response
   


# Create your views here.





class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer



class AsentamientoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Asentamiento.objects.all()
    serializer_class = AsentamientoSerializer
    #filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('asentamiento',)
