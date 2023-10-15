/*import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.page.html',
  styleUrls: ['./image-display.page.scss'],
})


export class ImageDisplayPage {
  imageUrl: string = '';
  retrievedImage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      const imageUrl = params['imageUrl'];
      if (imageUrl) {
        this.fetchImage(imageUrl);
      }
    });
  }

  fetchImage(url:string) {
    if (url) {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            this.retrievedImage = reader.result as string;
          };
        },
        (error) => {
          console.error('Error fetching image:', error);
        }
      );
    }
  }
}*/

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.page.html',
  styleUrls: ['./image-display.page.scss'],
})

export class ImageDisplayPage {
  imageUrl: string = '';
  retrievedImage: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      const imageUrl = params['imageUrl'];
      if (imageUrl) {
        this.fetchImage(imageUrl);
      }
    });
  }

  async fetchImage(url: string) {
    try {
      if (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        this.retrievedImage = URL.createObjectURL(blob);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  async uploadImage(imageData: FormData) {
    const url = 'http://127.0.0.1:8000/api/upload-image/'; // Replace with the actual URL
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    try {
      const response = await this.http.post(url, imageData, { headers }).toPromise();
      console.log('Image uploaded successfully', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  triggerImageUpload() {
    if (this.retrievedImage) {
      fetch(this.retrievedImage)
        .then(response => response.blob())
        .then(blob => {
          const imageData = new FormData();
          imageData.append('image', blob, 'image.jpg'); // Adjust the filename as needed
          this.uploadImage(imageData);
        })
        .catch(error => {
          console.error('Error fetching image:', error);
        });
    }
  }

}