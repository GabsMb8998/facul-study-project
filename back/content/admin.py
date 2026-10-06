from django.contrib import admin

from .models import Assunto, Materia


@admin.register(Materia)
class MateriaAdmin(admin.ModelAdmin):
    list_display = ("nome", "is_active")
    search_fields = ("nome",)
    list_filter = ("is_active",)


@admin.register(Assunto)
class AssuntoAdmin(admin.ModelAdmin):
    list_display = ("nome", "materia", "ordem", "is_active")
    search_fields = ("nome", "materia__nome")
    list_filter = ("materia", "is_active")
    ordering = ("materia", "ordem")