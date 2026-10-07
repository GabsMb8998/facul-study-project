from rest_framework import serializers

from .models import Questao


class QuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questao
        fields = [
            "id",
            "assunto",
            "enunciado",
            "tipo",
            "dados",
            "nivel",
            "vestibular",
            "is_active",
        ]