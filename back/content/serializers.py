from rest_framework import serializers

from .models import Assunto, Materia
from .services import definir_ordem_assunto


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = [
            "id",
            "nome",
            "descricao",
            "is_active",
        ]


class AssuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assunto
        fields = [
            "id",
            "materia",
            "nome",
            "conteudo",
            "ordem",
            "is_active",
        ]

    def update(self, instance, validated_data):
        nova_ordem = validated_data.get("ordem")

        if nova_ordem is not None and nova_ordem != instance.ordem:
            definir_ordem_assunto(instance, nova_ordem)
            validated_data.pop("ordem")

        return super().update(instance, validated_data)