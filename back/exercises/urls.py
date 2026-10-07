from rest_framework.routers import DefaultRouter

from .views import QuestaoViewSet


router = DefaultRouter()

router.register("questoes", QuestaoViewSet)

urlpatterns = router.urls