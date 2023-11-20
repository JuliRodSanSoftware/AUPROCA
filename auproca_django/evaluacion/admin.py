from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import Usuario, Evaluacion, Labor, TipoLabor

admin.site.register(Usuario)
admin.site.register(Permission)
admin.site.register(Evaluacion)
admin.site.register(TipoLabor)
admin.site.register(Labor)