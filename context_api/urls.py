from django.urls import path

from .views import ReportAPIView

app_name = "context"
urlpatterns = [
    path("report/", ReportAPIView.as_view(), name="export-report"),
]
