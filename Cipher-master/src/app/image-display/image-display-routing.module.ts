import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageDisplayPage } from './image-display.page';

const routes: Routes = [
  {
    path: '',
    component: ImageDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageDisplayPageRoutingModule {}
