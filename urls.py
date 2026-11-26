from django.urls import path

from .views import AlbumDetailView, AlbumListView, AlbumResumoView

urlpatterns = [
    path('', AlbumListView.as_view(), name='album-list'),
    path('resumo/', AlbumResumoView.as_view(), name='album-resumo'),
    path('<int:pk>/', AlbumDetailView.as_view(), name='album-detail'),
]