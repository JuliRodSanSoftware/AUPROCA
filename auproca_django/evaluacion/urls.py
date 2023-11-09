from django.urls import include, path
from .views import *

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tipoLabor', TipoLaborViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
