import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { Observable, scheduled } from 'rxjs';
import {Subject} from 'rxjs';
import { Events} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private eventSubject = new Subject<any>();

  
  usertype="visitor";
  db = firebase.firestore();
  public products:Array<any> = [];
  public orders:Array<any> = [];

  //event notification
  publishEvent(data: any) {
    this.eventSubject.next(data);
  }
  getObservable(): Subject<any> {
    return this.eventSubject;
  }


  constructor(private storage: Storage,
    public router: Router,
    private events: Events) {
      var user = firebase.auth().currentUser;
      var self= this;
      

      if (this.usertype == "visitor"){
        this.db.collection("products")
       .onSnapshot(function(querySnapshot) {
             console.log("products list changed...........1visitor");
             self.products = [];
             querySnapshot.forEach(function(doc) {
                 var product = doc.data();
                 // console.log(doc.id)
                 self.products.push({name:product.name, price:
                 product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid})
             });
              //self.events.publish('dataloaded,Date.now());
 
              self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("products reloaded");
         } );
         var user = firebase.auth().currentUser;
         if((user != null)){
         self.orders = [];
         this.db.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
         .onSnapshot(function(querySnapshot){
          console.log("orders list changed...........1visitor");
          self.orders = [];
          querySnapshot.forEach(function(doc) {
              var order = doc.data();
              // console.log(doc.id)
              self.orders.push({total:order.total, numItems:order.numItems, 
                                productName:order.productName, orderDate:order.orderDate, uid:order.uid})
          });
           //self.events.publish('dataloaded,Date.now());

           self.publishEvent({
              foo: 'bar'
          });

          console.log("products reloaded");
      } );
    }
      }
      else{
        this.db.collection("products")
       .onSnapshot(function(querySnapshot) {
             console.log("products list changed...........2 owner");
             self.products = [];
             querySnapshot.forEach(function(doc) {
                 var product = doc.data();
                 self.products.push({name:product.name, price:
                  product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid})
             });
 
             self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("products reloaded");
         } );
         self.orders = [];
      }
     } //end of constructor

     setUsertype(type) {
       var user = firebase.auth().currentUser;
      var self=this;
      this.usertype= type;
      console.log("usertype set as: "+type);
      if (this.usertype == "visitor"){
         this.db.collection("products")
        .onSnapshot(function(querySnapshot) {
              console.log("products list changed...........");
              self.products = [];
              querySnapshot.forEach(function(doc) {
                  var product = doc.data();
                  self.products.push({name:product.name, price:
                    product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid})
              });
               //self.events.publish('dataloaded',Date.now());
              self.publishEvent({
                    foo: 'bar'
                });
              console.log("products reloaded");
          } );

          if((user != null)){
          self.orders = [];
          this.db.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
          .onSnapshot(function(querySnapshot){
           console.log("orders list changed...........1visitor");
           self.orders = [];
           querySnapshot.forEach(function(doc) {
               var order = doc.data();
               // console.log(doc.id)
               self.orders.push({total:order.total, numItems:order.numItems, 
                                 productName:order.productName, orderDate:order.orderDate, uid:order.uid, id:doc.id})
           });
            //self.events.publish('dataloaded,Date.now());
 
            self.publishEvent({
               foo: 'bar'
           });
 
           console.log("products reloaded");
       } );
      }
   }
   else{
     this.db.collection("products")
    .onSnapshot(function(querySnapshot) {
          console.log("products list changed...........");
          self.products = [];
          querySnapshot.forEach(function(doc) {
              var product = doc.data();
              self.products.push({name:product.name, price:
                product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id, uid:product.uid })
          });
          // self.events.publish('dataloaded',Date.now());
          self.publishEvent({
              foo: 'bar'
          });
  
          console.log("products reloaded");
      } );
   }
  
    }
     


  getProducts():any{
    var productsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.products);
      }, 1000);
});

return productsObservable;

  }

  addProduct(name, price, category, photoUrl, description){
    var self = this;
    var uid = null;
    if (firebase.auth().currentUser !=  null){
      uid=firebase.auth().currentUser.uid
      console.log(uid, " :****** uid");
   }
   else{
      console.log(" no user logged in, no product created")
   }

   var db = firebase.firestore();
         db.collection("products").add({
           'uid' : uid,
           'name' : name,
           'price': price,
           'category': category,
           'photoUrl': photoUrl,
           'description' : description
     })
     .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
         
         //update this products arrays
     })
     .catch(function(error) {
         console.error("Error adding document: ", error);
     });



    }

    getOrders():any{var ordersObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.orders);
      }, 1000);
      });
  
          return ordersObservable;
    }

    addOrder(total, numItems, productName, orderDate){
      var self = this;
      var uid = null;
      if (firebase.auth().currentUser !=  null){
        uid=firebase.auth().currentUser.uid
        console.log(uid, " :****** uid");

     var db = firebase.firestore();
     db.collection("orders").add({
       'total' : total,
       'numItems' : numItems,
       'productName': productName,
       'orderDate': orderDate,
       'uid' : uid
 })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
     
     //update this products arrays
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });


     }
     else{
        console.log(" no user logged in, no order created")
     }
  
  
      }

deleteProduct(id){
  if(this.usertype == "owner") {
        var self=this;
        var db = firebase.firestore();
  
        db.collection("products").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            console.log("Product deleted:"+id)
            self.router.navigate(["/tabs/product-list"]);
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
  // YOU ARE NOT AN OWNER AND CANNOT DELETE A PRODUCT

  }
}
deleteOrder(id){
      if(this.usertype == "visitor") {
      var self=this;
      var db = firebase.firestore();

      db.collection("orders").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
          console.log("Order deleted:"+id)
          self.router.navigate(["/tabs/product-list"]);
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  } else {
    // YOU ARE NOT A VISITOR AND CANNOT DELETE AN ORDER
  }
}

}
  
  export const snapshotToArray = snapshot => {
    let returnArr = [];
  
    snapshot.forEach(childSnapshot => {
        let product = childSnapshot.val();
        product.id = childSnapshot.key;
        // console.log(item);
        returnArr.push(product);
    });
  
    return returnArr;
  }



