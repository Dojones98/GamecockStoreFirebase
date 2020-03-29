import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../product.service';
import { ChangeDetectorRef } from '@angular/core';

import * as firebase from 'firebase';


@Component({
  selector: 'app-order-list-final',
  templateUrl: './order-list-final.page.html',
  styleUrls: ['./order-list-final.page.scss'],
})
export class OrderListFinalPage implements OnInit {

  mySubscription: any;

  cart = [];

  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    public productService: ProductService
  ) { 
    this.productService.getObservable().subscribe((data) => {
      console.log('Data Received order list final', data);
      this.cart = this.productService.getCart()
      });
      
      this.cart = this.productService.cart;

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });




  }

  ngOnInit() {
    this.cart = this.productService.getCart();
    console.log(this.cart.length);
    if(this.productService.usertype == "undefined"){
      this.productService.usertype = "visitor";
      console.log(this.productService);
    }
    this.changeRef.detectChanges();
  }

}
