from content.models import Assunto
from .models import Prova


NIVEIS = range(1, 6)
PORCENTAGEM_MINIMA = 70

def nivel_concluido(usuario, assunto, nivel):
    return Prova.objects.filter(
        usuario=usuario,
        assunto=assunto,
        nivel=nivel,
        aprovada=True,
    ).exists()

def nivel_desbloqueado(usuario, assunto, nivel):
    # O primeiro nível do primeiro assunto sempre começa desbloqueado
    if assunto.ordem == 1 and nivel == 1:
        return True

    # Para os outros níveis, precisa ter concluído o nível anterior
    if nivel > 1:
        return nivel_concluido(
            usuario,
            assunto,
            nivel - 1,
        )

    # Nível 1 de assuntos posteriores depende do assunto anterior
    return assunto_desbloqueado(
        usuario,
        assunto,
    )

def assunto_desbloqueado(usuario, assunto):
    if assunto.ordem == 1:
        return True

    assunto_anterior = Assunto.objects.filter(
        materia=assunto.materia,
        ordem=assunto.ordem - 1,
    ).first()

    if not assunto_anterior:
        return False

    return nivel_concluido(
        usuario,
        assunto_anterior,
        5,
    )

def get_niveis_progresso(usuario, assunto):
    return [
        {
            "nivel": nivel,
            "desbloqueado": nivel_desbloqueado(
                usuario,
                assunto,
                nivel,
            ),
            "concluido": nivel_concluido(
                usuario,
                assunto,
                nivel,
            ),
        }
        for nivel in NIVEIS
    ]