import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService, snapshotToArray } from '../product.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  

  imgFile = "/assets/cover.png";
  mySubscription: any;

  products = [];

  constructor(
    private router: Router,
    public productService: ProductService
  ) {
    this.productService.getObservable().subscribe((data) => {
      console.log('Data Received product list', data);
      this.products = this.productService.products;
      });
      
      this.products = this.productService.products;
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
    if(firebase.auth().currentUser == null) {
      console.log("Current User is null")
      this.productService.setUsertype("visitor");
    }
    this.products = this.productService.getProducts();
    console.log(this.products.length);
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  goToProduct(product){
  	console.log(product);
  	this.router.navigate(["/product-detail", product]);

  }

  openAddProductPage(){
    this.router.navigate(["/add-product"]);
  }

  login(){
   this.router.navigate(["/login"]);
 }
 logout(){
  var self=this;
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("logout ok. Byebye")
  self.router.navigate(["/login"]);
    }).catch(function(error) {
    // An error happened.
    });

    //reset usertype to visitor
    this.productService.setUsertype("visitor");
    this.productService.orders = [];
}

}
