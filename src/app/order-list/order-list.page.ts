import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  constructor(
    private router: Router,
    public orderService: OrderService
  ) {}
  orders = [];
    

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  getOrders(order){
  	console.log(order);
  	this.router.navigate(["/order-detail", order]);

}
  goToOrder(order) {
    this.router.navigate(["/order-detail", order]);

  }
}
