from django.contrib import admin

from .models import Assunto, Materia, SubAssunto


class SubAssuntoInline(admin.TabularInline):
    model = SubAssunto
    extra = 0


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
    inlines = (SubAssuntoInline,)


@admin.register(SubAssunto)
class SubAssuntoAdmin(admin.ModelAdmin):
    list_display = ("nome", "assunto", "ordem", "is_active")
    search_fields = ("nome", "assunto__nome", "assunto__materia__nome")
    list_filter = ("assunto__materia", "is_active")
    ordering = ("assunto", "ordem")