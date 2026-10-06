from django.db import models
import uuid
from content.models import Assunto


class Questao(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    class Tipo(models.TextChoices):
        MULTIPLA_ESCOLHA = "multiple_choice", "Múltipla escolha"
        VERDADEIRO_FALSO = "true_false", "Verdadeiro ou falso"
        RESPOSTA_CURTA = "short_answer", "Resposta curta"

    assunto = models.ForeignKey(
        Assunto,
        on_delete=models.CASCADE,
        related_name="questoes",
    )
    enunciado = models.TextField()
    tipo = models.CharField(
        max_length=30,
        choices=Tipo.choices,
    )
    dados = models.JSONField(default=dict)
    nivel = models.PositiveSmallIntegerField(default=1)
    vestibular = models.CharField(
        max_length=100,
        blank=True,
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.enunciado[:80]