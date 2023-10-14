import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PopoverComponent } from './popover/popover.component'; // Import PopoverComponent

@NgModule({
  declarations: [HomePage, PopoverComponent], // Declare PopoverComponent here
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
})
export class HomePageModule {}
