from django.shortcuts import render

from rest_framework import viewsets

from .models import Assunto, Materia
from .serializers import AssuntoSerializer, MateriaSerializer


class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer


class AssuntoViewSet(viewsets.ModelViewSet):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer
