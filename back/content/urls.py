from rest_framework.routers import DefaultRouter

from .views import AssuntoViewSet, MateriaViewSet, SubAssuntoViewSet


router = DefaultRouter()

router.register("materias", MateriaViewSet, basename="materia")
router.register("assuntos", AssuntoViewSet, basename="assunto")
router.register("subassuntos", SubAssuntoViewSet, basename="subassunto")

urlpatterns = router.urls