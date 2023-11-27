from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import *


admin.site.register(Usuario)
admin.site.register(Permission)
admin.site.register(TipoLabor)
admin.site.register(Labor)
admin.site.register(Evaluacion)
admin.site.register(Rol)
admin.site.register(UserRol)
admin.site.register(Periodo)

