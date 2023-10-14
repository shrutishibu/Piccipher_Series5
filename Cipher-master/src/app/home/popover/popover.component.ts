import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  imageUrl: string = '';

  constructor(private popoverController: PopoverController, private router: Router) {
    defineCustomElements(window);
  }

  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
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
        source: CameraSource.Photos,
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

  async uploadurl(){
    const imageUrl = prompt('Enter the URL of the image:');

    if (imageUrl) {
      this.imageUrl = imageUrl;
      this.router.navigate(['image-display', { imageUrl: this.imageUrl }]);
    }
  }

  async moveAndHandleImage(imageUri: string) {
    const newFileName = `${new Date().getTime()}.jpeg`;

    const copiedImage = await Filesystem.copy({
      from: imageUri,
      to: `${Directory.Data}/${newFileName}`,
    });
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
}
