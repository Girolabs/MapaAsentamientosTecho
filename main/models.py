from django.db import models

# Create your models here.
class Asentamiento(models.Model):

    identificador = models.CharField(max_length=1000, blank=True)
    nro_encuesta = models.CharField(max_length=1000, blank=True)
    zona = models.CharField(max_length=1000, blank=True)
    asentamiento = models.CharField(max_length=1000, blank=True)
    ciudad = models.CharField(max_length=1000, blank=True)
    nombre_Encuestador = models.CharField(max_length=1000, blank=True)
    cel_encuestador = models.CharField(max_length=1000, blank=True)
    nombre_lider = models.CharField(max_length=1000, blank=True)
    cargo = models.CharField(max_length=1000, blank=True)
    cel_lider = models.CharField(max_length=1000, blank=True)
    tipo_formacion = models.CharField(max_length=1000, blank=True)
    tipo_formacion_otro = models.CharField(max_length=1000, blank=True)
    origen = models.CharField(max_length=1000, blank=True)
    origen_otro = models.CharField(max_length=1000, blank=True)
    poblador_mas_antiguo = models.CharField(max_length=1000, blank=True)
    poblador_mas_nuevo = models.CharField(max_length=1000, blank=True)
    superficie = models.CharField(max_length=1000, blank=True)
    numero_lotes = models.CharField(max_length=1000, blank=True)
    medida_lotes = models.CharField(max_length=1000, blank=True)
    numero_aprox_viviendas = models.BigIntegerField(blank=True, null=True)
    numero_aprox_viviendas_precarias = models.BigIntegerField(blank=True, null=True)
    numero_aprox_viviendas_precarias_otro = models.CharField(
        max_length=1000, blank=True
    )
    numero_familias = models.BigIntegerField(blank=True, null=True)
    multiples_familias = models.CharField(max_length=1000, blank=True)
    tipo_propiedad = models.CharField(max_length=1000, blank=True)
    tipo_propiedad_fiscal = models.CharField(max_length=1000, blank=True)
    esta_loteada = models.CharField(max_length=1000, blank=True)
    plano_aprobado_muni = models.CharField(max_length=1000, blank=True)
    plano_aprobado_sas = models.CharField(max_length=1000, blank=True)
    conocimiento_adjudicacion = models.CharField(max_length=1000, blank=True)
    encargado_asignacion_lotes = models.CharField(max_length=1000, blank=True)
    encargado_asignacion_lotes_otros = models.CharField(max_length=1000, blank=True)
    ultima_salida_familia = models.CharField(max_length=1000, blank=True)
    desalojos = models.CharField(max_length=1000, blank=True)
    titulo_lotes = models.CharField(max_length=1000, blank=True)
    proceso_de_transferencia_titulos = models.CharField(max_length=1000, blank=True)
    razon_proceso_legalizacion = models.CharField(max_length=1000, blank=True)
    razon_proceso_legalizacion_otro = models.CharField(max_length=1000, blank=True)
    apoyo_organizacion = models.CharField(max_length=1000, blank=True)
    institucion_encargada_legalizacion = models.CharField(max_length=1000, blank=True)
    instucion_encargada_legalizacion_otro = models.CharField(
        max_length=1000, blank=True
    )
    legalizacion_etapa = models.CharField(max_length=1000, blank=True)
    legalizacion_etapa_otro = models.CharField(max_length=1000, blank=True)
    lotes_vendidos = models.CharField(max_length=1000, blank=True)
    lotes_vendidos_responsables = models.CharField(max_length=1000, blank=True)
    lotes_vendidos_precio = models.CharField(max_length=1000, blank=True)
    lotes_vendidos_destino = models.CharField(max_length=1000, blank=True)
    lotes_vendidos_destino_otro = models.CharField(max_length=1000, blank=True)
    excretas = models.CharField(max_length=1000, blank=True)
    escretas_otros = models.CharField(max_length=1000, blank=True)
    agua_tipo_provision = models.CharField(max_length=1000, blank=True)
    agua_tipo_conexion_regular = models.CharField(max_length=1000, blank=True)
    agua_tipo_provision_otro = models.CharField(max_length=1000, blank=True)
    agua_cantidad_familias = models.CharField(max_length=1000, blank=True)
    energia_tipo_provision = models.CharField(max_length=1000, blank=True)
    energia_cantidad_medidor = models.CharField(max_length=1000, blank=True)
    agua = models.CharField(max_length=1000, blank=True)
    agua_tiempo_tramites = models.CharField(max_length=1000, blank=True)
    agua_ano_obtencion = models.CharField(max_length=1000, blank=True)
    energia = models.CharField(max_length=1000, blank=True)
    energia_tiempo_tramites = models.CharField(max_length=1000, blank=True)
    energia_ano_obtencion = models.CharField(max_length=1000, blank=True)
    eliminacion_basura_tipo = models.CharField(max_length=1000, blank=True)
    eliminacion_basura_tipo_otro = models.CharField(max_length=1000, blank=True)
    cocina_metodo = models.CharField(max_length=1000, blank=True)
    cocina_metodo_otro = models.CharField(max_length=1000, blank=True)
    vias_acceso_material = models.CharField(max_length=1000, blank=True)
    vias_acceso_material_otro = models.CharField(max_length=1000, blank=True)
    caminos_material = models.CharField(max_length=1000, blank=True)
    caminos_material_otro = models.CharField(max_length=1000, blank=True)
    caminos_estado = models.CharField(max_length=1000, blank=True)
    calles_delimitadas_nombradas = models.CharField(max_length=1000, blank=True)
    calles_delimitadas_nombradas_otro = models.CharField(max_length=1000, blank=True)
    alumbrado_publico = models.CharField(max_length=1000, blank=True)
    alumbrado_publico_otro = models.CharField(max_length=1000, blank=True)
    alumbrado_publico_extension = models.CharField(max_length=1000, blank=True)
    alumbrado_publico_extension_otro = models.CharField(max_length=1000, blank=True)
    ong_asistencia = models.CharField(max_length=1000, blank=True)
    ong_proyectos = models.CharField(max_length=1000, blank=True)
    ong_familias_beneficiadas = models.CharField(max_length=1000, blank=True)
    ong_inicio_trabajos = models.CharField(max_length=1000, blank=True)
    programas_viviendas = models.CharField(max_length=1000, blank=True)
    programas_viviendas_lista = models.CharField(max_length=1000, blank=True)
    programas_viviendas_tipo = models.CharField(max_length=1000, blank=True)
    comision_vecinal = models.CharField(max_length=1000, blank=True)
    cooperativa = models.CharField(max_length=1000, blank=True)
    comedores = models.CharField(max_length=1000, blank=True)
    junta_saneamiento = models.CharField(max_length=1000, blank=True)
    guarderias = models.CharField(max_length=1000, blank=True)
    otras_organizaciones_asentamiento = models.CharField(max_length=1000, blank=True)
    ninguna_organizacion = models.CharField(max_length=1000, blank=True)
    comision_vecinal_participantes = models.CharField(max_length=1000, blank=True)
    organizacion_social_otro = models.CharField(max_length=1000, blank=True)
    comision_vecinal_eleccion_mecanismo = models.CharField(max_length=1000, blank=True)
    ribera_rio = models.CharField(max_length=1000, blank=True)
    arroyo = models.CharField(max_length=1000, blank=True)
    cerro = models.CharField(max_length=1000, blank=True)
    basurero = models.CharField(max_length=1000, blank=True)
    lineas_alta_tension = models.CharField(max_length=1000, blank=True)
    barrio_residencial = models.CharField(max_length=1000, blank=True)
    barranco = models.CharField(max_length=1000, blank=True)
    cantera = models.CharField(max_length=1000, blank=True)
    humedales = models.CharField(max_length=1000, blank=True)
    fabricas = models.CharField(max_length=1000, blank=True)
    ruta = models.CharField(max_length=1000, blank=True)
    lugares_cercanos_otro = models.CharField(max_length=1000, blank=True)
    distanica_comisaria = models.CharField(max_length=1000, blank=True)
    distancia_fiscalia_barrial = models.CharField(max_length=1000, blank=True)
    distancia_puesto_salud = models.CharField(max_length=1000, blank=True)
    distancia_hospital_publico = models.CharField(max_length=1000, blank=True)
    distancia_escuela_publica = models.CharField(max_length=1000, blank=True)
    distancia_escuela_privada = models.CharField(max_length=1000, blank=True)
    distancia_colegio_nacional = models.CharField(max_length=1000, blank=True)
    distancia_universidad = models.CharField(max_length=1000, blank=True)
    distancia_instituto_tecnico = models.CharField(max_length=1000, blank=True)
    distancia_transporte_publico = models.CharField(max_length=1000, blank=True)
    distancia_supermercado = models.CharField(max_length=1000, blank=True)
    distancia_centro_comunitario = models.CharField(max_length=1000, blank=True)
    distancia_cancha_deportiva = models.CharField(max_length=1000, blank=True)
    distancia_iglesia = models.CharField(max_length=1000, blank=True)
    distancia_zona_verde = models.CharField(max_length=1000, blank=True)
    distancia_comite_politico = models.CharField(max_length=1000, blank=True)
    obs_generales_lugar = models.CharField(max_length=1000, blank=True)
    problema_violencia = models.CharField(max_length=1000, blank=True)
    problema_desempleo = models.CharField(max_length=1000, blank=True)
    problema_drogadiccion = models.CharField(max_length=1000, blank=True)
    problema_educacion = models.CharField(max_length=1000, blank=True)
    problema_agua_potable = models.CharField(max_length=1000, blank=True)
    problema_salud = models.CharField(max_length=1000, blank=True)
    problema_falta_energia = models.CharField(max_length=1000, blank=True)
    problema_eliminacion_basura = models.CharField(max_length=1000, blank=True)
    problema_camino = models.CharField(max_length=1000, blank=True)
    problema_union_vecinos = models.CharField(max_length=1000, blank=True)
    problema_otro = models.CharField(max_length=1000, blank=True)
    aspectos_positivos = models.CharField(max_length=1000, blank=True)
    observaciones_grales = models.CharField(max_length=1000, blank=True)
    datos_adjuntos = models.CharField(max_length=1000, blank=True)
    asentamiento_intervenido_techo = models.CharField(
        max_length=1000, blank=True, default="no"
    )

    def __str__(self):
        return self.asentamiento
