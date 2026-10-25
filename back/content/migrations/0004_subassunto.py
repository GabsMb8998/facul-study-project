import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0003_rename_descricao_assunto_conteudo_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="SubAssunto",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("nome", models.CharField(max_length=100)),
                ("conteudo", models.TextField(blank=True)),
                ("ordem", models.PositiveIntegerField(blank=True, null=True)),
                ("is_active", models.BooleanField(default=False)),
                (
                    "assunto",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="subassuntos",
                        to="content.assunto",
                    ),
                ),
            ],
            options={
                "ordering": ("ordem", "nome"),
            },
        ),
    ]
