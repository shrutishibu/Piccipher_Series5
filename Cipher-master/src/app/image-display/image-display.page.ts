import { Component } from '@angular/core';
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
}