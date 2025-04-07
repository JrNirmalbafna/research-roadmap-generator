from django.db import models
from django.contrib.auth.models import User


class ResearchTopic(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='research_topics')

    def __str__(self):
        return self.title


class ResearchRoadmap(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    topic = models.ForeignKey(ResearchTopic, on_delete=models.CASCADE, related_name='roadmaps')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roadmaps')

    def __str__(self):
        return self.title


class RoadmapStep(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField()
    roadmap = models.ForeignKey(ResearchRoadmap, on_delete=models.CASCADE, related_name='steps')
    estimated_time = models.DurationField(null=True, blank=True)
    resources = models.TextField(blank=True, help_text="Comma-separated list of resources")
    
    def __str__(self):
        return f"{self.roadmap.title} - Step {self.order}: {self.title}"
    
    class Meta:
        ordering = ['order']


class Resource(models.Model):
    RESOURCE_TYPES = (
        ('article', 'Article'),
        ('book', 'Book'),
        ('video', 'Video'),
        ('course', 'Course'),
        ('website', 'Website'),
        ('tool', 'Tool'),
        ('other', 'Other'),
    )
    
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    roadmap_step = models.ForeignKey(RoadmapStep, on_delete=models.CASCADE, related_name='resource_links')
    
    def __str__(self):
        return self.title
