import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../product.service';
import { ChangeDetectorRef } from '@angular/core'

import * as firebase from 'firebase';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  imgFile = "/assets/cover.png";
  mySubscription: any;

orders = [];

  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    public productService: ProductService
  ) {
    this.productService.getObservable().subscribe((data) => {
      console.log('Data Received product list', data);
      });
      
      this.orders = this.productService.orders;
   }

  ngOnInit() {
    this.orders = this.productService.getOrders();
    console.log(this.orders.length);
    if(this.productService.usertype == "undefined"){
      this.productService.usertype = "visitor";
      console.log(this.productService);
    }
    this.changeRef.detectChanges();
  }
  

  goToOrder(order){
    console.log(order);
  	this.router.navigate(["/order-detail", order]);
  }

}
