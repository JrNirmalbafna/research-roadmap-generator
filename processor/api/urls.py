from django.urls import path, include
from rest_framework.routers import DefaultRouter
from processor.api.views import (
    ResearchTopicViewSet,
    ResearchRoadmapViewSet,
    RoadmapStepViewSet,
    ResourceViewSet
)

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'topics', ResearchTopicViewSet)
router.register(r'roadmaps', ResearchRoadmapViewSet)
router.register(r'steps', RoadmapStepViewSet)
router.register(r'resources', ResourceViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
] 