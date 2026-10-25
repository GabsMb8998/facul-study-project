from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import Assunto, Materia, SubAssunto


class CatalogApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.materia = Materia.objects.create(
            nome="Matemática",
            is_active=True,
        )
        self.assunto = Assunto.objects.create(
            materia=self.materia,
            nome="Regra de três",
            ordem=1,
            is_active=True,
        )
        self.subassunto = SubAssunto.objects.create(
            assunto=self.assunto,
            nome="Regra de três simples",
            ordem=1,
            is_active=True,
        )
        SubAssunto.objects.create(
            assunto=self.assunto,
            nome="Rascunho",
            ordem=2,
            is_active=False,
        )

    def test_materia_detail_includes_published_nested_content(self):
        response = self.client.get(
            reverse("materia-detail", args=[self.materia.id])
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["assuntos"]), 1)
        self.assertEqual(
            response.data["assuntos"][0]["subassuntos"][0]["id"],
            str(self.subassunto.id),
        )
        self.assertEqual(
            response.data["assuntos"][0]["subassuntos"][0]["nome"],
            "Regra de três simples",
        )

    def test_subassunto_list_can_be_filtered_by_assunto(self):
        response = self.client.get(
            reverse("subassunto-list"),
            {"assunto": str(self.assunto.id)},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], str(self.subassunto.id))

    def test_catalog_writes_require_authentication(self):
        response = self.client.post(
            reverse("subassunto-list"),
            {
                "assunto": str(self.assunto.id),
                "nome": "Regra de três composta",
            },
            format="json",
        )

        self.assertIn(response.status_code, (401, 403))
