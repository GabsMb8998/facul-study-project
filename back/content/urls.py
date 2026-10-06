from rest_framework.routers import DefaultRouter

from .views import AssuntoViewSet, MateriaViewSet


router = DefaultRouter()

router.register("materias", MateriaViewSet)
router.register("assuntos", AssuntoViewSet)

urlpatterns = router.urls