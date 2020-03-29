import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../product.service';
import { ChangeDetectorRef } from '@angular/core';

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
      this.orders = this.productService.getOrders();
      });
      
      this.orders = this.productService.orders;

   
   }

  ngOnInit() {
    this.orders = this.productService.getOrders();
    console.log(this.orders.length);
    if(this.productService.usertype == "undefined"){
      this.productService.usertype = "visitor";
    }
  }
  

  goToOrder(order){
    console.log(order);
  	this.router.navigate(["/order-detail", order]);
  }

  order(){
    var self = this;
    var total = 0;

    console.log(total);

    
    let dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = month + "/" + day + "/" + year;
    console.log("Just before calling checkOut");
    //self.productService.total_price = 0;
    //self.productService.total_quantity = 0;
    self.productService.updateQuantityPrice();
    setTimeout(() => { self.productService.pushCartToFirebase(newdate, 
                                                              self.productService.total_price, 
                                                              self.productService.total_quantity);  }, 2000);
    
    
    console.log("Logging the total price");
    console.log(self.productService.total_price);
    console.log(self.productService.total_quantity);
    this.router.navigate(["tabs/product-list"]);

               

  }

}
