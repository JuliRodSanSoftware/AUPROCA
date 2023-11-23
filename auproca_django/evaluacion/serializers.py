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


class EvaluacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluacion
        fields = '__all__'


class LaborSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labor
        fields = '__all__'

class UserRolSerializer(serializers.ModelSerializer):
    class Meta:
        model  = UserRol
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Rol
        fields = '__all__'

class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Periodo
        fields = '__all__'