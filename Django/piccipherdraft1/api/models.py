#adding data models

from django.db import models

class UploadedImage(models.Model):
    image_file = models.ImageField(upload_to='uploads/', null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image {self.id}"

class ExtractedText(models.Model):
    # Model to store extracted text from images
    image = models.ForeignKey(UploadedImage, on_delete=models.CASCADE)  # Connects each text to the corresponding image
    text = models.TextField()
    extracted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:1000]  # Display the first 1000 characters of extracted text in the admin panel

