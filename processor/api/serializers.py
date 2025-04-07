from rest_framework import serializers
from processor.models import ResearchTopic, ResearchRoadmap, RoadmapStep, Resource


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url', 'description', 'resource_type']


class RoadmapStepSerializer(serializers.ModelSerializer):
    resource_links = ResourceSerializer(many=True, read_only=True)
    
    class Meta:
        model = RoadmapStep
        fields = ['id', 'title', 'description', 'order', 'estimated_time', 'resources', 'resource_links']


class ResearchRoadmapSerializer(serializers.ModelSerializer):
    steps = RoadmapStepSerializer(many=True, read_only=True)
    
    class Meta:
        model = ResearchRoadmap
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'steps']
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)


class ResearchTopicSerializer(serializers.ModelSerializer):
    roadmaps = ResearchRoadmapSerializer(many=True, read_only=True)
    
    class Meta:
        model = ResearchTopic
        fields = ['id', 'title', 'description', 'created_at', 'updated_at', 'roadmaps']
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data) 