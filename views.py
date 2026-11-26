from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Album
from .serializers import AlbumSerializer


class AlbumListView(ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def create(self, request, *args, **kwargs):
        # valida antes de salvar
        try:
            nota = float(request.data.get('rating'))
            ano = int(request.data.get('year'))
        except (TypeError, ValueError):
            return Response({"erro": "rating e year tem que ser numero"}, status=400)

        if nota < 0 or nota > 10:
            return Response({"erro": "a avaliacao precisa ser entre 0 e 10"}, status=400)
        if ano < 1900 or ano > 2026:
            return Response({"erro": "o ano precisa ser entre 1900 e 2026"}, status=400)

        return super().create(request, *args, **kwargs)


class AlbumDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class AlbumResumoView(APIView):
    def get(self, request):
        lista = list(Album.objects.all())
        total = len(lista)

        if total == 0:
            return Response({"total": 0, "media_avaliacao": 0, "melhor": None})

        soma = 0
        maior = lista[0]
        for a in lista:
            soma = soma + a.rating
            if a.rating > maior.rating:
                maior = a

        media = round(soma / total, 2)

        return Response({"total": total, "media_avaliacao": media, "melhor": maior.title})