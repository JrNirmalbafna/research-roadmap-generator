from django.contrib import admin
from processor.models import ResearchTopic, ResearchRoadmap, RoadmapStep, Resource

class ResourceInline(admin.TabularInline):
    model = Resource
    extra = 1

class RoadmapStepAdmin(admin.ModelAdmin):
    list_display = ('title', 'roadmap', 'order')
    list_filter = ('roadmap',)
    inlines = [ResourceInline]

class RoadmapStepInline(admin.TabularInline):
    model = RoadmapStep
    extra = 1

class ResearchRoadmapAdmin(admin.ModelAdmin):
    list_display = ('title', 'topic', 'created_by', 'created_at')
    list_filter = ('topic', 'created_by')
    inlines = [RoadmapStepInline]

class ResearchTopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'created_at')
    list_filter = ('created_by',)

# Register your models here
admin.site.register(ResearchTopic, ResearchTopicAdmin)
admin.site.register(ResearchRoadmap, ResearchRoadmapAdmin)
admin.site.register(RoadmapStep, RoadmapStepAdmin)
admin.site.register(Resource)
