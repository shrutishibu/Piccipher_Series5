import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Router } from '@angular/router'; 
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  imageUrl: string=''; // Variable to store the URL of the image

  constructor(private popoverController: PopoverController, private router: Router) {
    defineCustomElements(window);
  }



  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Store the image as a file URI
        source: CameraSource.Camera, // Use the device camera
      });
      if (image && image.dataUrl) {
        this.router.navigate(['/image-display'], { queryParams: { imageUrl: image.dataUrl } });
        // await this.moveAndHandleImage(image.dataUrl);
      } else {
        console.error('Image or image data URL is undefined');
      }
      // Close the popover
      this.dismissPopover();
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async uploadFromMedia() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Open the device's media library
      });
      if (image && image.dataUrl) {
        this.router.navigate(['/image-display'], { queryParams: { imageUrl: image.dataUrl } });
        // await this.moveAndHandleImage(image.dataUrl);
      } else {
        console.error('Image or image data URL is undefined');
      }
      this.dismissPopover();
      
    } catch (error) {
      console.error('Error selecting an image:', error);
    }
  }

/*
  async uploadurl() {
    try {
      // Prompt the user for an image URL
      const imageUrl = prompt('Enter the URL of the image:');
      if (imageUrl) {
        console.log('User provided URL:', imageUrl);
  
        // Navigate to the 'image-display' page with the provided URL
        this.router.navigate(['/image-display'], { queryParams: { imageUrl: imageUrl } });
      } else {
        console.error('No image URL provided.');
      }
    } catch (error) {
      console.error('Error occurred during URL upload:', error);
    }
  }
  */

  async uploadurl() {
    try {
      // Prompt the user for an image URL
      const imageUrl = prompt('Enter the URL of the image:');
      if (imageUrl) {
        console.log('User provided URL:', imageUrl);
  
        const proxyUrl = 'http://localhost:3000/image?imageUrl=' + encodeURIComponent(imageUrl);
        this.router.navigate(['/image-display'], { queryParams: { imageUrl: proxyUrl } });
      } else {
        console.error('No image URL provided.');
      }
    } catch (error) {
      console.error('Error occurred during URL upload:', error);
    }
  }
  

  async moveAndHandleImage(imageUri: string) {
    const newFileName = '${new Date().getTime()}.jpeg';
    const destinationDirectory = 'C:/Users/Shibu Punneth Varkey/OneDrive/Documents/VS Code Codes/Piccipher/Django-branch/PicCipher-master/media/uploads';
    const destinationPath = '${destinationDirectory}/${newFileName}';
    console.log("test: " + imageUri); // This line is for testing the value of imageUri
    // Use Filesystem.copy to move and rename the selected image
    const copiedImage = await Filesystem.copy({
        from: imageUri,
        to: destinationPath,
    });

    this.router.navigate(['image-display', { imageUrl: copiedImage.uri }]);

    // Here, 'copiedImage.uri' contains the new file URI
    // You can use it for further processing or uploading

    // Implement your logic for handling or uploading the image here
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
}