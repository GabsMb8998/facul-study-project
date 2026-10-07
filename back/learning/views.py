from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Prova, Tentativa
from .serializers import ProvaSerializer, TentativaSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from exercises.models import Questao
from rest_framework.decorators import action
from .dashboard import get_dashboard
from content.models import Assunto
import random
from .services import get_niveis_progresso

class ProvaViewSet(viewsets.ModelViewSet):
    serializer_class = ProvaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Prova.objects.filter(
            usuario=self.request.user
        ).order_by("-created_at")

    def create(self, request):
        assunto_id = request.data.get("assunto")
        nivel = request.data.get("nivel")

        if not assunto_id or not nivel:
            return Response(
                {"detail": "assunto e nivel são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            nivel = int(nivel)
        except (TypeError, ValueError):
            return Response(
                {"detail": "nivel deve ser um número."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if nivel < 1 or nivel > 5:
            return Response(
                {"detail": "nivel deve estar entre 1 e 5."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            assunto = Assunto.objects.get(
                id=assunto_id,
                is_active=True,
            )
        except Assunto.DoesNotExist:
            return Response(
                {"detail": "Assunto não encontrado."},
                status=status.HTTP_404_NOT_FOUND,
            )

        niveis = get_niveis_progresso(
            request.user,
            assunto,
        )

        nivel_info = next(
            nivel_info
            for nivel_info in niveis
            if nivel_info["nivel"] == nivel
        )

        if not nivel_info["desbloqueado"]:
            return Response(
                {"detail": "Este nível ainda está bloqueado."},
                status=status.HTTP_403_FORBIDDEN,
            )

        questoes = list(
            Questao.objects.filter(
                assunto=assunto,
                nivel=nivel,
                is_active=True,
            )
        )

        if len(questoes) < 10:
            return Response(
                {
                    "detail": (
                        "Não há questões suficientes para gerar esta prova."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        questoes = random.sample(questoes, 10)

        prova = Prova.objects.create(
            usuario=request.user,
            assunto=assunto,
            nivel=nivel,
        )

        prova.questoes.set(questoes)

        return Response(
            {
                "id": prova.id,
                "assunto": prova.assunto.id,
                "nivel": prova.nivel,
                "questoes": [
                    {
                        "id": questao.id,
                        "enunciado": questao.enunciado,
                        "tipo": questao.tipo,
                        "dados": {
                            **questao.dados,
                            "resposta": None,
                        },
                        "nivel": questao.nivel,
                        "vestibular": questao.vestibular,
                    }
                    for questao in questoes
                ],
            },
            status=status.HTTP_201_CREATED,
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="responder",
    )
    def responder(self, request, pk=None):
        prova = self.get_object()

        questao_id = request.data.get("questao")
        resposta = request.data.get("resposta")

        if not questao_id:
            return Response(
                {"detail": "questao é obrigatória."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            questao = prova.questoes.get(id=questao_id)
        except Questao.DoesNotExist:
            return Response(
                {"detail": "Essa questão não pertence à prova."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if Tentativa.objects.filter(
            prova=prova,
            questao=questao,
        ).exists():
            return Response(
                {"detail": "Essa questão já foi respondida."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        resposta_correta = questao.dados.get("resposta")

        acertou = resposta == resposta_correta

        tentativa = Tentativa.objects.create(
            prova=prova,
            questao=questao,
            resposta=resposta,
            acertou=acertou,
        )

        return Response(
            {
                "id": tentativa.id,
                "questao": questao.id,
                "acertou": acertou,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(
        detail=True,
        methods=["post"],
        url_path="finalizar",
    )
    def finalizar(self, request, pk=None):
        prova = self.get_object()

        total_questoes = prova.questoes.count()
        tentativas = prova.tentativas.all()

        total_respondidas = tentativas.count()

        if total_respondidas < total_questoes:
            return Response(
                {
                    "detail": (
                        f"Você precisa responder todas as questões. "
                        f"Respondidas: {total_respondidas}/{total_questoes}."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        total_acertos = tentativas.filter(
            acertou=True
        ).count()

        porcentagem = (
            total_acertos / total_questoes
        ) * 100

        aprovada = porcentagem >= 70

        prova.porcentagem_acerto = porcentagem
        prova.aprovada = aprovada
        prova.save(
            update_fields=[
                "porcentagem_acerto",
                "aprovada",
            ]
        )

        return Response(
            {
                "id": prova.id,
                "total_questoes": total_questoes,
                "total_acertos": total_acertos,
                "porcentagem_acerto": porcentagem,
                "aprovada": aprovada,
            },
            status=status.HTTP_200_OK,
        )
    


class TentativaViewSet(viewsets.ModelViewSet):
    serializer_class = TentativaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tentativa.objects.filter(
            prova__usuario=self.request.user
        )

class ProgressoAssuntosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        assuntos = Assunto.objects.filter(
            is_active=True,
        ).select_related(
            "materia",
        ).order_by(
            "materia_id",
            "ordem",
        )

        data = []

        for assunto in assuntos:
            data.append({
                "id": assunto.id,
                "nome": assunto.nome,
                "conteudo": assunto.conteudo,
                "materia": assunto.materia.id,
                "ordem": assunto.ordem,
                "desbloqueado": any(
                    nivel["desbloqueado"]
                    for nivel in get_niveis_progresso(
                        request.user,
                        assunto,
                    )
                ),
                "niveis": get_niveis_progresso(
                    request.user,
                    assunto,
                ),
            })

        return Response(data)
    
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            get_dashboard(request.user)
        )