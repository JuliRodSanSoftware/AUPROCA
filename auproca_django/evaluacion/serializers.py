from rest_framework import serializers
from .models import *

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TipoLaborSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoLabor
        fields = '__all__'


