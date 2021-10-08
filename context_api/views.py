from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ReportSerializer


class ReportAPIView(APIView):
    serializer_class = ReportSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"data": serializer.data, "message": "Successful"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )
