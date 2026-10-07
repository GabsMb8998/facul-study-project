from django.db import transaction
from rest_framework.exceptions import ValidationError
from django.db import models

from .models import Assunto


@transaction.atomic
def definir_ordem_assunto(assunto, nova_ordem):
    if assunto.is_active:
        raise ValidationError(
            "Não é possível alterar a ordem de um assunto publicado."
        )

    if nova_ordem < 1:
        raise ValidationError(
            "A ordem deve ser maior que zero."
        )

    assuntos_publicados = Assunto.objects.filter(
        materia=assunto.materia,
        is_active=True,
    )

    ultima_ordem_publicada = (
        assuntos_publicados.order_by("-ordem")
        .values_list("ordem", flat=True)
        .first()
    )

    if (
        ultima_ordem_publicada is not None
        and nova_ordem <= ultima_ordem_publicada
    ):
        raise ValidationError(
            "A ordem deve ser posterior aos assuntos publicados."
        )

    assuntos_nao_publicados = Assunto.objects.filter(
        materia=assunto.materia,
        is_active=False,
    ).exclude(
        id=assunto.id
    )

    ordem_atual = assunto.ordem

    if ordem_atual is None:
        # Assunto ainda não tinha posição.
        assuntos_nao_publicados.filter(
            ordem__gte=nova_ordem
        ).update(
            ordem=models.F("ordem") + 1
        )

    elif nova_ordem < ordem_atual:
        # Exemplo: 5 → 3
        assuntos_nao_publicados.filter(
            ordem__gte=nova_ordem,
            ordem__lt=ordem_atual,
        ).update(
            ordem=models.F("ordem") + 1
        )

    elif nova_ordem > ordem_atual:
        # Exemplo: 3 → 5
        assuntos_nao_publicados.filter(
            ordem__gt=ordem_atual,
            ordem__lte=nova_ordem,
        ).update(
            ordem=models.F("ordem") - 1
        )

    assunto.ordem = nova_ordem
    assunto.save(update_fields=["ordem"])

    return assunto