import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    private popoverController: PopoverController,

  ) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
} 

  
  
