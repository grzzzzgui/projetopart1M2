from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Album(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
    )

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f'{self.title} — {self.artist}'
