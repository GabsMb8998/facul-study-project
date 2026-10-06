from django.contrib import admin
from .models import Questao

@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "assunto",
        "tipo",
        "nivel",
        "vestibular",
        "is_active",
    )
    list_filter = (
        "tipo",
        "nivel",
        "is_active",
        "assunto__materia",
    )
    search_fields = (
        "enunciado",
        "assunto__nome",
        "vestibular",
    )