from django.shortcuts import render

def upload_fail(request):
    # Optionally, you can provide context data for the failure page
    context = {
        'message': 'Upload failed. Please try again.',
        # Add any other relevant data
    }
    return render(request, 'upload_fail.html', context)
