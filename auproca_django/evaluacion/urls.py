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
router.register(r'ListaCEvaluacion', EvaluacionListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', UserCreate.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('is_logged_in/', IsLoggedInView.as_view(), name='is_logged_in'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
