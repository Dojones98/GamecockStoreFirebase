import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListFinalPage } from './order-list-final.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListFinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListFinalPageRoutingModule {}
