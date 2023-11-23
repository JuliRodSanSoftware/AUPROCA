from django.urls import include, path
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tipoLabor', TipoLaborViewSet)
router.register(r'Evaluacion', EvaluacionViewSet)
router.register(r'Labor', LaborViewSet)
router.register(r'UserRol', UserRolViewSet)
router.register(r'Rol', RolViewSet, basename="Rol")
router.register(r'Periodo', PeriodoViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
