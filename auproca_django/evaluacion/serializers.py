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


class EvaluacionListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='eva_id')
    periodo = serializers.CharField(source='per_id.per_nombre')
    identificacionDocente = serializers.IntegerField(source='usr_identificacion.usr_identificacion.usr_identificacion') 
    nombreDocente = serializers.CharField(source='usr_identificacion.usr_identificacion.usu_nombre')
    apellidoDocente = serializers.CharField(source='usr_identificacion.usr_identificacion.usu_apellido')
    idLabor = serializers.IntegerField(source='lab_id.lab_id') 
    nombreLabor = serializers.CharField(source='lab_id.lab_nombre')
    horas = serializers.IntegerField(source='lab_id.lab_horas')
    fechaInicio = serializers.DateField(source='per_id.per_fechainicio')
    fechaFin = serializers.DateField(source='per_id.per_fechafin')
    estado = serializers.CharField(source='get_eva_estado_display')
    resultados = serializers.CharField(source= "eva_resultado")
    puntaje = serializers.FloatField(source="eva_puntaje")
    sugerencias = serializers.CharField(source="eva_sugerencias")

    class Meta:
        model = Evaluacion
        fields = ['id','periodo', 'idLabor', 'identificacionDocente', 'nombreDocente', 'apellidoDocente', 'nombreLabor', 'horas', 'fechaInicio', 'fechaFin', 'estado', 'resultados', 'puntaje', 'sugerencias']


class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        return data
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class ChangePasswordSerializer(serializers.Serializer):
    model = User
    username = serializers.CharField(required=True)
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)