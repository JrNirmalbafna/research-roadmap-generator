from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from processor.models import ResearchTopic, ResearchRoadmap, RoadmapStep, Resource
from processor.api.serializers import (
    ResearchTopicSerializer, 
    ResearchRoadmapSerializer,
    RoadmapStepSerializer,
    ResourceSerializer
)
from processor.services import generate_research_roadmap, process_generated_roadmap


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner of the snippet.
        return obj.created_by == request.user


class ResearchTopicViewSet(viewsets.ModelViewSet):
    queryset = ResearchTopic.objects.all()
    serializer_class = ResearchTopicSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        # Filter to only show topics created by current user
        return ResearchTopic.objects.filter(created_by=self.request.user)


class ResearchRoadmapViewSet(viewsets.ModelViewSet):
    queryset = ResearchRoadmap.objects.all()
    serializer_class = ResearchRoadmapSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        # Filter to only show roadmaps created by current user
        return ResearchRoadmap.objects.filter(created_by=self.request.user)
    
    def perform_create(self, serializer):
        # Set the owner when creating a new roadmap
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """
        Generate a research roadmap based on topic and field
        """
        topic = request.data.get('topic')
        field = request.data.get('field')
        depth = request.data.get('depth', 'intermediate')
        
        if not topic or not field:
            return Response(
                {'error': 'Both topic and field are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate roadmap using the service
        roadmap_data = generate_research_roadmap(topic, field, depth)
        
        # Process and save the roadmap
        roadmap = process_generated_roadmap(roadmap_data, request.user)
        
        # Return the created roadmap
        serializer = self.get_serializer(roadmap)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RoadmapStepViewSet(viewsets.ModelViewSet):
    queryset = RoadmapStep.objects.all()
    serializer_class = RoadmapStepSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filter steps by roadmap ID if provided
        roadmap_id = self.request.query_params.get('roadmap', None)
        if roadmap_id:
            return RoadmapStep.objects.filter(roadmap__id=roadmap_id)
        # Otherwise return steps for roadmaps owned by the user
        return RoadmapStep.objects.filter(roadmap__created_by=self.request.user)


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filter resources by step ID if provided
        step_id = self.request.query_params.get('step', None)
        if step_id:
            return Resource.objects.filter(roadmap_step__id=step_id)
        # Otherwise return resources for steps in roadmaps owned by the user
        return Resource.objects.filter(roadmap_step__roadmap__created_by=self.request.user) 