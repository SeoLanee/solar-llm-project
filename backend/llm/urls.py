# llm/urls.py

from django.urls import path
from .views import QuestionView, ConvertToPDFView  # 경로를 'llm.views'로 변경

urlpatterns = [
    path('get_question/', QuestionView.as_view(), name='get_question'),
    path('convert_to_pdf/', ConvertToPDFView.as_view(), name='convert_to_pdf'),
]
