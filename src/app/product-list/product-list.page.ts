import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService, snapshotToArray } from '../product.service';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  
  imgFile = "/assets/cover.png";
  mySubscription: any;
  showLogout = null;
  showLogin = null;
  

  products = [];

  constructor(
    private router: Router,
    public productService: ProductService,
    private alertCtrl: AlertController
 ) {
/*
    if(this.productService.user == null) {
      this.showLogin = true;
      this.showLogout = false;
    } else if (this.productService.user == null) {
      this.showLogin = false;
      this.showLogout = true;
    }

*/
    this.productService.getObservable().subscribe((data) => {
      console.log('Data Received product list', data);
      this.products = this.productService.getProducts();
      
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
    if(this.productService.user == null) {
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
    this.router.navigate(["/product-detail", product]);
    //this.router.navigate(['/update-product', product]);
  }

  openAddProductPage(){
    if(this.productService.usertype != "owner"){
      this.addProductError();
    } else {
    this.router.navigate(["/add-product"]);
    }
  }

  login(){
   if(firebase.auth().currentUser != null){
     this.presentLogin();
   }  else {
   this.router.navigate(["/login"]);
   }
 }
 logout(){
  if(firebase.auth().currentUser == null){
    this.presentLogout();
  } else{

  var self=this;
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("logout ok. Byebye")
  self.router.navigate(["/login"]);
  self.productService.setUsertype("signout");
    }).catch(function(error) {
    // An error happened.
    });

    //reset usertype to visitor
    //this.productService.setUsertype("visitor");
    this.productService.orders = [];
  }
}

async presentLogin() {
  let alert = await this.alertCtrl.create({
    message: 'Login Error: You are already logged in.',
    buttons: [{
      text: 'Dismiss',
      handler: () => {
        console.log('No clicked');
      }}]
  });
  await alert.present();
}


async presentLogout() {
  let alert = await this.alertCtrl.create({
    message: 'Logout Error: You are not currently logged in.',
    buttons: [{
      text: 'Dismiss',
      handler: () => {

        console.log('No clicked');
      }}]
  });
  await alert.present();
}

async addProductError() {
  let alert = await this.alertCtrl.create({
    message: 'You can not add a product as a visitor. Please log in as an owner to add a product.',
    buttons: [{
      text: 'Dismiss',
      handler: () => {

        console.log('No clicked');
      }}]
  });
  await alert.present();
}


}
