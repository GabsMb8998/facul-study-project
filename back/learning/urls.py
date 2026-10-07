from rest_framework.routers import DefaultRouter

from .views import ProvaViewSet, TentativaViewSet, ProgressoAssuntosView,DashboardView
from django.urls import path

router = DefaultRouter()

router.register("provas", ProvaViewSet, basename="prova")
router.register("tentativas", TentativaViewSet, basename="tentativa")

urlpatterns = router.urls



urlpatterns = [
    path(
        "progresso/assuntos/",
        ProgressoAssuntosView.as_view(),
        name="progresso-assuntos",
    ),
    path(
        "dashboard/",
        DashboardView.as_view(),
        name="dashboard",
    ),
]

urlpatterns += router.urls