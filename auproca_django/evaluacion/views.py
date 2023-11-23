from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer

    @action(detail=True, methods=['patch'])
    def actualizar_evaluacion_docencia(self, request, pk=None):
        evaluacion = self.get_object()
        resultado_texto = request.data.get('eva_resultado', '')

        evaluacion.eva_resultado = resultado_texto
        evaluacion.save()

        serializer = self.get_serializer(evaluacion)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def actualizar_evaluacion_otros(self, request, pk=None):
        evaluacion = self.get_object()
        resultado_texto = request.data.get('eva_resultado', '')
        puntaje = request.data.get('eva_puntaje', '')
        sugerencias = request.data.get('eva_sugerencias', '')

        evaluacion.eva_resultado = resultado_texto
        evaluacion.eva_puntaje = puntaje
        evaluacion.eva_sugerencias = sugerencias

        # Aquí puedes manejar la subida de documentos al cloud y obtener el link
        # Por ejemplo, utilizando Django Storage
        # documento = request.FILES.get('documento')
        # Guardar el documento en la nube y obtener el link

        # Supongamos que 'documento_link' es el link obtenido
        documento_link = 'https://ejemplo.com/documento.pdf'
        evaluacion.eva_resultado = documento_link

        evaluacion.save()

        serializer = self.get_serializer(evaluacion)
        return Response(serializer.data)

class TipoLaborViewSet(viewsets.ModelViewSet):
    queryset = TipoLabor.objects.all()
    serializer_class = TipoLaborSerializer

class LaborViewSet(viewsets.ModelViewSet):
    queryset = Labor.objects.all()
    serializer_class = LaborSerializer

class UserRolViewSet(viewsets.ModelViewSet):
    queryset = UserRol.objects.all()
    serializer_class = UserRolSerializer

class RolViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RolSerializer
    def get_queryset(self):    
        queryset = Rol.objects.exclude(rol_descripcion__in=['Decano', 'Coordinador'])
        return queryset

class PeriodoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer