from django.db import models
import uuid

class Materia(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.nome

class Assunto(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    materia = models.ForeignKey(
        Materia,
        on_delete=models.CASCADE,
        related_name="assuntos",
    )
    nome = models.CharField(max_length=100)
    conteudo = models.TextField(blank=True)

    ordem = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.nome