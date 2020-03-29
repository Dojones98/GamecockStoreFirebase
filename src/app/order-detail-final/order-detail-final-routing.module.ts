import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailFinalPage } from './order-detail-final.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailFinalPageRoutingModule {}
