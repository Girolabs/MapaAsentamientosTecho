from django.contrib import admin

from .models import Asentamiento
# Register your models here.
from import_export import resources

from import_export.admin import ImportExportModelAdmin, ImportExportActionModelAdmin


class AsentamientoResource(resources.ModelResource):

    class Meta:
        model = Asentamiento
        #import_id_fields = ('identificador',)
        exclude = ('id', 'nombre_Encuestador','cel_encuestador','nombre_lider','cargo','cel_lider','numero_familias')





class AsentamientoAdmin(ImportExportModelAdmin):
	list_display = ('identificador','asentamiento', 'ciudad', 'numero_familias','numero_aprox_viviendas')
	search_fields = ['asentamiento', ]
	pass

admin.site.register(Asentamiento,AsentamientoAdmin)


