"""
-pip install pytesseract -> for OCR
-pip install requests -> for http response

"""

from django.shortcuts import render, redirect
from api.models import UploadedImage
from .forms import ImageUploadForm
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from django.core.files.base import ContentFile

import io

def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_file = form.cleaned_data.get('image_file')
            image_url = form.cleaned_data.get('image_url')
            
            if image_file:
                # Handle file uploaded from device
                uploaded_image = UploadedImage(image_file=image_file)
                uploaded_image.save()
            elif image_url:
                # Handle image URL provided by the user
                uploaded_image = UploadedImage(image_url=image_url)
                uploaded_image.save()
            # Add logic for other sources (camera, drive, etc.) as needed

            return redirect('upload_success')  # Redirect to a success page

    else:
        form = ImageUploadForm()

    return render(request, 'upload_form.html', {'form': form})

def upload_success(request):
    # Process the uploaded image and retrieve necessary data
    uploaded_image = ...  # Replace with your logic to get the uploaded image
    # Pass the uploaded image to the success page template context
    context = {'uploaded_image': uploaded_image}
    return render(request, 'success.html', context)
