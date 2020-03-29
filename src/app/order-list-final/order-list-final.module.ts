import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderListFinalPageRoutingModule } from './order-list-final-routing.module';

import { OrderListFinalPage } from './order-list-final.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderListFinalPageRoutingModule
  ],
  declarations: [OrderListFinalPage]
})
export class OrderListFinalPageModule {}
