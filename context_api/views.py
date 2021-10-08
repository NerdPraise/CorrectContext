from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ReportSerializer


class ReportAPIView(APIView):
    serializer_class = ReportSerializer

    def validate_data(self, data):
        schedule = data.get("schedule")
        if schedule == "NoRepeat":
            data["day"] = None
            data["time"] = None
            data["date"] = None
            is_valid = True
        elif schedule == "Specific":
            is_valid = bool(data.get("date") and data.get("time"))
        elif schedule == "Daily":
            is_valid = bool(data.get("time"))
            data["day"] = None
            data["date"] = None
        elif schedule == "Weekly":
            is_valid = bool(data.get("day") and data.get("time"))
            data["date"] = None
        else:
            is_valid = False

        return is_valid, data

    def post(self, request):
        data = request.data
        is_valid, data = self.validate_data(data)
        serializer = self.serializer_class(data=data)
        if not is_valid:
            return Response(
                {"message": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": "Successful"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
