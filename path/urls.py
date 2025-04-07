from django.urls import path
from .views import (
    RoadmapListCreateView, RoadmapDetailView,
    MilestoneListCreateView, TaskListCreateView
)
#addes by user
from .views import ChatRoomListCreateView, MessageListCreateView

urlpatterns = [
    path('roadmaps/', RoadmapListCreateView.as_view(), name='roadmap-list'),
    path('roadmaps/<int:pk>/', RoadmapDetailView.as_view(), name='roadmap-detail'),
    path('roadmaps/<int:roadmap_id>/milestones/', MilestoneListCreateView.as_view(), name='milestone-list'),
    path('milestones/<int:milestone_id>/tasks/', TaskListCreateView.as_view(), name='task-list'),
    path('rooms/', ChatRoomListCreateView.as_view(), name='chat-room-list'),
    path('rooms/<int:room_id>/messages/', MessageListCreateView.as_view(), name='message-list'),
]