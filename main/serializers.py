from django.contrib.auth.models import User, Group
from rest_framework import serializers
from main.models import Asentamiento

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class AsentamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asentamiento
        fields = ('identificador','asentamiento', 'ciudad', 'superficie','poblador_mas_antiguo','numero_familias','numero_aprox_viviendas',
        			'agua_tipo_provision','energia_tipo_provision','excretas','alumbrado_publico','alumbrado_publico_otro',
        			'cocina_metodo','cocina_metodo_otro','problema_eliminacion_basura','eliminacion_basura_tipo','comision_vecinal'
        	)



class AsentamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asentamiento
        fields = ('identificador','asentamiento', 'ciudad', 'superficie','poblador_mas_antiguo', 'poblador_mas_nuevo' ,'numero_familias','numero_aprox_viviendas',
        		'numero_aprox_viviendas_precarias',	'agua_tipo_provision','energia_tipo_provision','excretas','alumbrado_publico','alumbrado_publico_otro',
        			'cocina_metodo','cocina_metodo_otro','problema_eliminacion_basura','eliminacion_basura_tipo','comision_vecinal','esta_loteada',
        			'origen', 'numero_lotes','medida_lotes'
        	)