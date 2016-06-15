from django.contrib import admin

from .models import Asentamiento
# Register your models here.
from import_export import resources

from import_export.admin import ImportExportModelAdmin, ImportExportActionModelAdmin


class AsentamientoResource(resources.ModelResource):

    class Meta:
        model = Asentamiento
        import_id_fields = ('identificador',)





class AsentamientoAdmin(ImportExportModelAdmin):
    pass

admin.site.register(Asentamiento,AsentamientoAdmin)