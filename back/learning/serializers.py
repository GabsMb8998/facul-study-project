from rest_framework import serializers

from .models import Prova, Tentativa


class ProvaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prova
        fields = [
            "id",
            "assunto",
            "nivel",
            "porcentagem_acerto",
            "aprovada",
            "created_at",
        ]


class TentativaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tentativa
        fields = [
            "id",
            "prova",
            "questao",
            "resposta",
            "acertou",
        ]