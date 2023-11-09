from rest_framework import viewsets, routers
from .models import *
from .serializers import *


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class TipoLaborViewSet(viewsets.ModelViewSet):
    queryset = TipoLabor.objects.all()
    serializer_class = TipoLaborSerializer


