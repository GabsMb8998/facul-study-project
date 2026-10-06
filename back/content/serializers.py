from rest_framework import serializers

from .models import Assunto, Materia


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
            "descricao",
            "ordem",
            "is_active",
        ]