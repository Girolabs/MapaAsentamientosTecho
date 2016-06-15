from django.shortcuts import render, render_to_response

from django.http import HttpResponse

from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import UserSerializer, GroupSerializer, AsentamientoSerializer
from models import Asentamiento

from rest_framework import filters
from rest_framework.views import APIView
from rest_framework import generics
from django.db.models import Count

import json
from django.core import serializers

def index(request):
    
    ciudades = Asentamiento.objects.values("ciudad").annotate(total=Count('ciudad'))
    #asentamiento = serializers.serialize('json',Asentamiento.objects.all())
    asentamiento = json.dumps(list(ciudades))
    context = {'asentamiento':asentamiento}
    return render_to_response('index.html',context)



def mapa(request):
	return render_to_response('mapa.html')


def datos(request):
    return render_to_response('datos.html')


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
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('asentamiento',)
