from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from .models import Questao
from .serializers import QuestaoSerializer


class QuestaoViewSet(viewsets.ModelViewSet):
    queryset = Questao.objects.all()
    serializer_class = QuestaoSerializer