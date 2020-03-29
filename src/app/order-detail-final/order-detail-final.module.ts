import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailFinalPageRoutingModule } from './order-detail-final-routing.module';

import { OrderDetailFinalPage } from './order-detail-final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailFinalPageRoutingModule
  ],
  declarations: [OrderDetailFinalPage]
})
export class OrderDetailFinalPageModule {}
