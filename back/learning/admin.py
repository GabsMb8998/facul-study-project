from django.contrib import admin

from .models import Prova, Tentativa


@admin.register(Prova)
class ProvaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "usuario",
        "assunto",
        "nivel",
        "porcentagem_acerto",
        "aprovada",
        "created_at",
    )

    list_filter = (
        "aprovada",
        "nivel",
        "assunto",
    )


@admin.register(Tentativa)
class TentativaAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "prova",
        "questao",
        "acertou",
    )

    list_filter = (
        "acertou",
    )