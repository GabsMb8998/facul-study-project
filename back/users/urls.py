from django.urls import path

from .views import MeView, JWTView, RefreshTokenView, LogoutView


urlpatterns = [
    path("me/", MeView.as_view(), name="me"),
    path("auth/token/", JWTView.as_view(), name="auth_token"),
    path("auth/token/refresh/", RefreshTokenView.as_view(), name="auth_token_refresh"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]