from django.db.models import Prefetch
from rest_framework import permissions, viewsets

from .models import Assunto, Materia, SubAssunto
from .serializers import (
    AssuntoSerializer,
    MateriaSerializer,
    SubAssuntoSerializer,
)


class PublicReadAuthenticatedWrite(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or bool(
            request.user.is_authenticated
        )


def assuntos_visiveis(user):
    assuntos = Assunto.objects.all()
    subassuntos = SubAssunto.objects.all()

    if not user.is_authenticated:
        assuntos = assuntos.filter(is_active=True)
        subassuntos = subassuntos.filter(is_active=True)

    return assuntos.order_by("ordem", "nome").prefetch_related(
        Prefetch("subassuntos", queryset=subassuntos.order_by("ordem", "nome"))
    )


class MateriaViewSet(viewsets.ModelViewSet):
    serializer_class = MateriaSerializer
    permission_classes = [PublicReadAuthenticatedWrite]

    def get_queryset(self):
        materias = Materia.objects.all()
        if not self.request.user.is_authenticated:
            materias = materias.filter(is_active=True)

        return materias.order_by("nome").prefetch_related(
            Prefetch(
                "assuntos",
                queryset=assuntos_visiveis(self.request.user),
            )
        )


class AssuntoViewSet(viewsets.ModelViewSet):
    serializer_class = AssuntoSerializer
    permission_classes = [PublicReadAuthenticatedWrite]

    def get_queryset(self):
        queryset = assuntos_visiveis(self.request.user).select_related("materia")
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(materia__is_active=True)
        materia_id = self.request.query_params.get("materia")
        if materia_id:
            queryset = queryset.filter(materia_id=materia_id)
        return queryset


class SubAssuntoViewSet(viewsets.ModelViewSet):
    serializer_class = SubAssuntoSerializer
    permission_classes = [PublicReadAuthenticatedWrite]

    def get_queryset(self):
        queryset = SubAssunto.objects.all().select_related(
            "assunto", "assunto__materia"
        )
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(
                is_active=True,
                assunto__is_active=True,
                assunto__materia__is_active=True,
            )
        assunto_id = self.request.query_params.get("assunto")
        if assunto_id:
            queryset = queryset.filter(assunto_id=assunto_id)
        return queryset.order_by("ordem", "nome")
