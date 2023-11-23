from django.contrib import admin
from django.contrib.auth.models import Permission
from .models import *

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'usr_identificacion', 'usu_nombre', 'usu_apellido', 'login_groups')
    search_fields = ('usr_identificacion', 'login__username', 'login_groups')
    list_filter = ('login__groups', )

    def get_username(self, obj):
        return obj.login.username if obj.login else ''

    def login_groups(self, obj):
        return " - ".join([group.name for group in obj.login.groups.all().order_by('name')]) if obj.login else ''

    get_username.short_description = 'Nombre de Usuario'
    login_groups.short_description = 'Grupos'

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Permission)
admin.site.register(TipoLabor)
admin.site.register(Labor)
admin.site.register(Evaluacion)
admin.site.register(Rol)
admin.site.register(UserRol)
admin.site.register(Periodo)

