from django.db import models
from django.contrib.auth.models import User

class Usuario(models.Model):
    email = models.EmailField(unique=True, null=True)
    usr_identificacion = models.DecimalField(primary_key=True, max_digits=8, decimal_places=0)
    usu_nombre = models.CharField(max_length=50)
    usu_apellido = models.CharField(max_length=50, null=True, blank=True)
    usu_genero = models.CharField(max_length=1)
    usu_estudio = models.CharField(max_length=100, null=True, blank=True)

    generos = (
			('F','Femenino'),
            ('M', 'Masculino'),
            ('O','Otro - No mencionar'), 
            
		)
    
    usu_genero = models.CharField(max_length = 1, choices=generos)
    def __str__(self):
        return str(self.usr_identificacion)
    
class TipoLabor(models.Model):
    tl_id = models.DecimalField(primary_key=True, max_digits=8, decimal_places=0)
    tl_codigo = models.CharField(max_length=3)
    tl_descripcion = models.CharField(max_length=50)

    def __str__(self):
        return self.tl_codigo

class Rol(models.Model):
    roles = (
			('Decano','Decano'),
            ('Coordinador', 'Coordinador'),
            ('Planta','Planta'), 
            ('TC','TC'), 
			('Catedra','Catedra'), 
            
		)
	
    rol_id = models.DecimalField(primary_key=True, max_digits=8, decimal_places=0)
    rol_descripcion = models.CharField(max_length = 20, unique = True, choices=roles)

    def __str__(self):
        return self.rol_descripcion

class Labor(models.Model):
    lab_id = models.DecimalField(primary_key=True, max_digits=8, decimal_places=0)
    tl_id = models.ForeignKey(TipoLabor, on_delete=models.RESTRICT)
    lab_nombre = models.CharField(max_length=50)
    lab_horas = models.DecimalField(max_digits=8, decimal_places=0)

    def __str__(self):
        return self.lab_nombre

class Periodo(models.Model):
    per_id = models.DecimalField(primary_key=True, max_digits=8, decimal_places=0)
    per_nombre = models.CharField(max_length=50)
    per_fechainicio = models.DateField()
    per_fechafin = models.DateField()
    def __str__(self):
        return self.per_nombre

class UserRol(models.Model):
    usr_identificacion = models.ForeignKey(Usuario, on_delete=models.RESTRICT)
    rol_id = models.ForeignKey(Rol, on_delete=models.RESTRICT, db_column='rol_id', related_name='user_roles', related_query_name='user_role')
    def __str__(self):
        return str(self.id)+ ": "+ str(self.usr_identificacion) +"- " +  str(self.rol_id)

class Evaluacion(models.Model):
    ESTADO_CHOICES = (
        ('E', 'En ejecución'),
        ('T', 'Terminado'),
        ('S', 'Suspendido'),
    )

    eva_id = models.AutoField(primary_key=True)
    lab_id = models.ForeignKey(Labor, on_delete=models.RESTRICT)
    per_id = models.ForeignKey(Periodo, on_delete=models.RESTRICT)
    usr_identificacion = models.ForeignKey(UserRol, on_delete=models.RESTRICT, db_column='usr_identificacion', related_name='evaluaciones_usuario')
    rol_id = models.ForeignKey(UserRol, on_delete=models.RESTRICT, db_column='rol_id', related_name='evaluaciones_rol')
    eva_estado = models.CharField(max_length=1, choices=ESTADO_CHOICES)
    eva_puntaje = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    eva_resultado = models.CharField(max_length=1000, null=True, blank=True)
    eva_sugerencias = models.CharField(max_length=1000, null=True, blank=True)
    def __str__(self):
        return str(self.usr_identificacion.usr_identificacion)
