from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .serializers import UserSerializer


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)


class JWTView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = RefreshToken.for_user(request.user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

class RefreshTokenView(APIView):
    def post(self, request):
        refresh = RefreshToken(request.data["refresh"])

        return Response({
            "access": str(refresh.access_token),
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh = RefreshToken(request.data["refresh"])
            refresh.blacklist()

            return Response({
                "message": "Logout realizado com sucesso."
            })

        except TokenError:
            return Response(
                {"error": "Refresh token inválido."},
                status=400
            )