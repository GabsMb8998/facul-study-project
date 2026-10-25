from rest_framework import serializers

from .models import Assunto, Materia, SubAssunto
from .services import definir_ordem_assunto


class SubAssuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubAssunto
        fields = [
            "id",
            "assunto",
            "nome",
            "conteudo",
            "ordem",
            "is_active",
        ]


class AssuntoSerializer(serializers.ModelSerializer):
    subassuntos = SubAssuntoSerializer(many=True, read_only=True)
    materia_nome = serializers.CharField(source="materia.nome", read_only=True)

    class Meta:
        model = Assunto
        fields = [
            "id",
            "materia",
            "materia_nome",
            "nome",
            "conteudo",
            "ordem",
            "is_active",
            "subassuntos",
        ]

    def update(self, instance, validated_data):
        nova_ordem = validated_data.get("ordem")

        if nova_ordem is not None and nova_ordem != instance.ordem:
            definir_ordem_assunto(instance, nova_ordem)
            validated_data.pop("ordem")

        return super().update(instance, validated_data)


class MateriaSerializer(serializers.ModelSerializer):
    assuntos = AssuntoSerializer(many=True, read_only=True)

    class Meta:
        model = Materia
        fields = [
            "id",
            "nome",
            "descricao",
            "is_active",
            "assuntos",
        ]