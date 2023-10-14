import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  imageUrl: string = ''; // Variable to store the URL of the image
  imageUploadResponse$: Observable<any>;

  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private http: HttpClient
  ) {
    this.imageUploadResponse$ = new Observable();
  }

  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Store the image as a file URI
        source: CameraSource.Camera, // Use the device camera
      });

      if (image.webPath) {
        await this.moveAndHandleImage(image.webPath);
      } else {
        console.error('Image webPath is undefined');
      }

      this.dismissPopover();
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async uploadFromMedia() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Open the device's media library
      });

      if (image.webPath) {
        const imageUri = image.webPath;
        await this.moveAndHandleImage(imageUri);
      } else {
        console.error('Selected image webPath is undefined');
      }
    } catch (error) {
      console.error('Error selecting an image:', error);
    }
  }

  async UploadURL() {
    const imageUrl = prompt('Enter the URL of the image:');

    if (imageUrl) {
      this.imageUrl = imageUrl;
      this.router.navigate(['image-display', { imageUrl: this.imageUrl }]);
    }
  }

  async moveAndHandleImage(imageUri: string) {
    const newFileName = '${new Date().getTime()}.jpeg';

    const copiedImage = await Filesystem.copy({
      from: imageUri,
      to: Directory.Data + '/' + newFileName,
    });

    const uploadUrl = 'https://localhost:1800/api/upload-image';

    const formData = new FormData();
    formData.append('image', copiedImage.uri);

    const headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer your-access-token');

    this.imageUploadResponse$ = this.http.post(uploadUrl, formData, { headers }).pipe(
      map((response) => {
        console.log('Image uploaded successfully:', response);
        // Handle the response here
        return response;
      })
    );
  }


  dismissPopover() {
    this.popoverController.dismiss();
  }
}
