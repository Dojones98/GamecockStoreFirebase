import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, snapshotToArray } from '../product.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  

  imgFile = "/assets/cover.png";

  products = [];

  constructor(
    private router: Router,
    public productService: ProductService
  ) {
    this.productService.getObservable().subscribe((data) => {
      console.log('Data Received product list', data);
      //this.products = this.productService.products;
      });
      
      this.products = this.productService.products;
   }

  ngOnInit() {
    this.productService.setUsertype("visitor");
    this.products = this.productService.getProducts();
    console.log(this.products.length);
    if(this.productService.usertype == "undefined"){
      this.productService.setUsertype("visitor");
      console.log(this.productService);
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
}

}
