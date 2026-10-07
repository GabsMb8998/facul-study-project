import uuid

from django.conf import settings
from django.db import models

from content.models import Assunto
from exercises.models import Questao


class Prova(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="provas",
    )

    assunto = models.ForeignKey(
        Assunto,
        on_delete=models.CASCADE,
        related_name="provas",
    )

    nivel = models.PositiveSmallIntegerField()

    questoes = models.ManyToManyField(
        Questao,
        related_name="provas",
    )

    porcentagem_acerto = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
    )

    aprovada = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.assunto.nome} - Nível {self.nivel}"
    

class Tentativa(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    prova = models.ForeignKey(
        Prova,
        on_delete=models.CASCADE,
        related_name="tentativas",
    )

    questao = models.ForeignKey(
        Questao,
        on_delete=models.CASCADE,
        related_name="tentativas",
    )

    resposta = models.JSONField()

    acertou = models.BooleanField()

    def __str__(self):
        return f"{self.prova} - {self.questao.id}"