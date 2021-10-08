from django.db import models

# Create your models here.
class Report(models.Model):
    class FormatChoice(models.TextChoices):
        Excel = ("Excel", "Excel")
        CSV = ("CSV", "CSV")

    class ScheduleChoice(models.TextChoices):
        NoRepeat = ("NoRepeat", "NoRepear")
        Specific = ("Specific", "Specific")
        Daily = ("Daily", "Daily")
        Weekly = ("Weekly", "Weekly")

    name = models.CharField(max_length=120)
    format = models.CharField(
        max_length=20, choices=FormatChoice.choices, default=FormatChoice.Excel
    )
    email = models.EmailField()
    schedule = models.CharField(max_length=130, choices=ScheduleChoice.choices)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    day = models.CharField(max_length=20, blank=True, null=True)
