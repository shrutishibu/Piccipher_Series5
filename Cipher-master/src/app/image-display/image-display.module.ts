import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageDisplayPageRoutingModule } from './image-display-routing.module';
import { ImageDisplayPage } from './image-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDisplayPageRoutingModule
  ],
  declarations: [ImageDisplayPage]
})
export class ImageDisplayPageModule {}
