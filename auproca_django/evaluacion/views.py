from asyncio import AbstractServer
from datetime import timedelta
from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken  
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated



from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import CustomLoginSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EvaluacionViewSet(viewsets.ModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionSerializer

    @action(detail=True, methods=['patch'])
    def actualizar_evaluacion_docencia(self, request, pk=None):
        evaluacion = self.get_object()
        resultado_texto = request.data.get('eva_resultado', '')

        evaluacion.eva_resultado = resultado_texto
        evaluacion.save()

        serializer = self.get_serializer(evaluacion)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def actualizar_evaluacion_otros(self, request, pk=None):
        evaluacion = self.get_object()
        resultado_texto = request.data.get('eva_resultado', '')
        puntaje = request.data.get('eva_puntaje', '')
        sugerencias = request.data.get('eva_sugerencias', '')

        evaluacion.eva_resultado = resultado_texto
        evaluacion.eva_puntaje = puntaje
        evaluacion.eva_sugerencias = sugerencias

        # Aquí puedes manejar la subida de documentos al cloud y obtener el link
        # Por ejemplo, utilizando Django Storage
        # documento = request.FILES.get('documento')
        # Guardar el documento en la nube y obtener el link

        # Supongamos que 'documento_link' es el link obtenido
        documento_link = 'https://ejemplo.com/documento.pdf'
        evaluacion.eva_resultado = documento_link

        evaluacion.save()

        serializer = self.get_serializer(evaluacion)
        return Response(serializer.data)

class TipoLaborViewSet(viewsets.ModelViewSet):
    queryset = TipoLabor.objects.all()
    serializer_class = TipoLaborSerializer

class LaborViewSet(viewsets.ModelViewSet):
    queryset = Labor.objects.all()
    serializer_class = LaborSerializer

class UserRolViewSet(viewsets.ModelViewSet):
    queryset = UserRol.objects.all()
    serializer_class = UserRolSerializer

class RolViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RolSerializer
    def get_queryset(self):    
        queryset = Rol.objects.exclude(rol_descripcion__in=['Decano', 'Coordinador'])
        return queryset

class PeriodoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Periodo.objects.all()
    serializer_class = PeriodoSerializer


class EvaluacionListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Evaluacion.objects.all()
    serializer_class = EvaluacionListSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = CustomLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, username=email, password=password)
            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                auth_token = str(refresh.access_token)
                refresh_token = str(refresh)
                return Response({"message": "Login successful", "token": auth_token, "refresh": refresh_token}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"message": "Authentication failed 2"}, status=status.HTTP_401_UNAUTHORIZED)
        


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LogoutView(APIView):
    def post(self, request):
        try:
            token = request.data['token']
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            access_token = AccessToken(token)
            access_token.set_exp(lifetime=timedelta(seconds=0))
            return Response({"message": "Token revoked"}, status=200)
        except Exception as e:
            return Response({"message error": str(e)}, status=400)
        

class IsLoggedInView(APIView):
    def post(self, request):
        try:
            token = request.data['token']
            token_obj = AccessToken(token)
            user = token_obj.get('user_id')
            if user:
                return Response({"message": "User is logged in", "user_id": token_obj.get('user_id'),}, status=200)
            else:
                return Response({"message": "Invalid token: User information not found"}, status=401)
        except Exception as e:
            return Response({"message": "Invalid token: " + str(e)}, status=401)
        

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Verifica que el nombre de usuario sea correcto
            if not self.object.username == serializer.data.get("username"):
                return Response({"username": ["Nombre de usuario incorrecto."]}, status=status.HTTP_400_BAD_REQUEST)
            # Verifica la contraseña antigua
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Contraseña incorrecta."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password también cifra la contraseña que el usuario obtendrá
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Contraseña actualizada correctamente',
                'data': []
            }
            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)