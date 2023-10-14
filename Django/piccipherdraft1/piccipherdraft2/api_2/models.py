from django.db import models

class GroceryItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

class GroceryReceipt(models.Model):
    date = models.DateField()
    items = models.ManyToManyField(GroceryItem)
