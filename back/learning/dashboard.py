from django.db.models import Count, Q

from .models import Prova, Tentativa


def get_dashboard(usuario):
    tentativas = Tentativa.objects.filter(
        prova__usuario=usuario,
    )

    questoes_respondidas = tentativas.count()

    acertos = tentativas.filter(
        acertou=True,
    ).count()

    erros = tentativas.filter(
        acertou=False,
    ).count()

    if questoes_respondidas:
        porcentagem_acerto = (
            acertos / questoes_respondidas
        ) * 100
    else:
        porcentagem_acerto = 0

    provas = Prova.objects.filter(
        usuario=usuario,
    )

    provas_realizadas = provas.count()

    provas_aprovadas = provas.filter(
        aprovada=True,
    ).count()

    assuntos = []

    assuntos_data = (
        tentativas
        .values(
            "questao__assunto__id",
            "questao__assunto__nome",
        )
        .annotate(
            questoes_respondidas=Count("id"),
            acertos=Count(
                "id",
                filter=Q(acertou=True),
            ),
        )
        .order_by("questao__assunto__nome")
    )

    for assunto in assuntos_data:
        respondidas = assunto["questoes_respondidas"]
        total_acertos = assunto["acertos"]

        porcentagem = (
            total_acertos / respondidas * 100
            if respondidas
            else 0
        )

        niveis_concluidos = (
            Prova.objects.filter(
                usuario=usuario,
                assunto_id=assunto["questao__assunto__id"],
                aprovada=True,
            )
            .values("nivel")
            .distinct()
            .count()
        )

        assuntos.append({
            "id": assunto["questao__assunto__id"],
            "nome": assunto["questao__assunto__nome"],
            "questoes_respondidas": respondidas,
            "acertos": total_acertos,
            "porcentagem_acerto": porcentagem,
            "niveis_concluidos": niveis_concluidos,
        })

    return {
        "questoes_respondidas": questoes_respondidas,
        "acertos": acertos,
        "erros": erros,
        "porcentagem_acerto": porcentagem_acerto,
        "provas_realizadas": provas_realizadas,
        "provas_aprovadas": provas_aprovadas,
        "assuntos": assuntos,
    }