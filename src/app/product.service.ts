import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase';
import { Observable, scheduled, onErrorResumeNext } from 'rxjs';
import {Subject} from 'rxjs';
import { Events} from '@ionic/angular';
import { OrderService } from './order.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private eventSubject = new Subject<any>();

  
  usertype="visitor";
  db = firebase.firestore();
  public products:Array<any> = [];
  public orders:Array<any> = [];
  public cart:Array<any> = [];
  public total_quantity;
  public total_price;
  public prices_string = [];
  public quantities_string = [];
  public products_string = "";

  user = null;

  //event notification
  publishEvent(data: any) {
    this.eventSubject.next(data);
  }
  getObservable(): Subject<any> {
    return this.eventSubject;
  }


  constructor(private storage: Storage,
    public router: Router,
    private alertCtrl: AlertController,
    private events: Events) {
      user = firebase.auth().currentUser;
      var self= this;
      self.total_quantity = 0;
      self.total_price = 0;
      

      if (this.usertype == "visitor"){
        this.db.collection("products")
       .onSnapshot(function(querySnapshot) {
             console.log("products list changed...........1visitor");
             self.products = [];
             querySnapshot.forEach(function(doc) {
                 var product = doc.data();
                 // console.log(doc.id)
                 self.products.push({name:product.name, price:
                 product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid, thumbnail:product.thumbnail})
             });
              //self.events.publish('dataloaded,Date.now());
 
              self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("products reloaded");
         } );
//#############################################################
//#############################################################
//#############################################################

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
      self.cart = [];
      this.db.collection("cart").where("uid", "==", firebase.auth().currentUser.uid)
         .onSnapshot(function(querySnapshot){
          console.log("orders list changed...........1visitor");
          self.cart = [];
          querySnapshot.forEach(function(doc) {
           var cart = doc.data();
           self.cart.push({total_price:cart.total_price, total_quantity:
            cart.total_quantity ,orderDate:cart.orderDate, id:doc.id,uid:cart.uid, prices_string:cart.prices_string,
            quantities_string:cart.quantities_string, products_string:cart.products_string, cart_id:cart.cart_id})
  
       });
        
           //self.events.publish('dataloaded,Date.now());

           self.publishEvent({
              foo: 'bar'
          });

          console.log("products reloaded");
      } );

    }
//#############################################################
//#############################################################
//#############################################################

      }
      else{
        this.db.collection("products")
       .onSnapshot(function(querySnapshot) {
             console.log("products list changed...........2 owner");
             self.products = [];
             querySnapshot.forEach(function(doc) {
                 var product = doc.data();
                 self.products.push({name:product.name, price:
                  product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid, thumbnail:product.thumbnail})
             });
 
             self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("products reloaded");
         } );
         
      self.publishEvent({
          foo: 'bar'
      });

      console.log("products reloaded");
      self.cart = [];
      self.orders = [];
 
      }








     } //end of constructor

     setUsertype(type) {
       var user = firebase.auth().currentUser;
      var self=this;
      this.usertype= type;
      console.log("usertype set as: "+type);
      if (type == "signout"){
        this.db.collection("products")
        .onSnapshot(function(querySnapshot) {
              console.log("products list changed...........");
              self.products = [];
              querySnapshot.forEach(function(doc) {
                  var product = doc.data();
                  self.products.push({name:product.name, price:
                    product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid, thumbnail:product.thumbnail})
              });
               //self.events.publish('dataloaded',Date.now());
              self.publishEvent({
                    foo: 'bar'
                });
              console.log("products reloaded");
          } );
          this.orders = [];
          this.cart = [];
      }


      if (this.usertype == "visitor"){
         this.db.collection("products")
        .onSnapshot(function(querySnapshot) {
              console.log("products list changed...........");
              self.products = [];
              querySnapshot.forEach(function(doc) {
                  var product = doc.data();
                  self.products.push({name:product.name, price:
                    product.price ,category:product.category, photoUrl:product.photoUrl, description:product.description, id:doc.id,uid:product.uid, thumbnail:product.thumbnail})
              });
               //self.events.publish('dataloaded',Date.now());
              self.publishEvent({
                    foo: 'bar'
                });
              console.log("products reloaded");
          } );
          self.orders = [];
          self.cart = [];

          if((user != null)){
          self.orders = [];
          self.cart = [];
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
       });
       self.cart = [];
       this.db.collection("cart").where("uid", "==", firebase.auth().currentUser.uid)
          .onSnapshot(function(querySnapshot){
           console.log("orders list changed...........1visitor");
           self.cart = [];
           querySnapshot.forEach(function(doc) {
            var cart = doc.data();
            self.cart.push({total_price:cart.total_price, total_quantity:
              cart.total_quantity ,orderDate:cart.orderDate, id:doc.id,uid:cart.uid, prices_string:cart.prices_string,
              quantities_string:cart.quantities_string, products_string:cart.products_string, cart_id:cart.cart_id})

        });
         
            //self.events.publish('dataloaded,Date.now());
 
            self.publishEvent({
               foo: 'bar'
           });
 
           console.log("products reloaded");
       }
       
       //INSERT HERE ############################
       
       );
      }
   }
   else{
     this.db.collection("products").where("uid", "==", firebase.auth().currentUser.uid)
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

    getUserType(){
      return this.usertype;
    }
     


  getProducts():any{
    var productsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.products);
      }, 1000);
});

return productsObservable;

  }

  addProduct(name, price, category, photoUrl, description, thumb){
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
           'description' : description,
           'thumbnail' : thumb
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
        this.presentNotVisitor();
     }
  
  
      }
 

updateQuantityPrice(){
  var self = this;
  var uid=firebase.auth().currentUser.uid
  self.total_price = 0;
  self.total_quantity = 0;
  self.prices_string = [];
  self.products_string = "";
  self. quantities_string = [];
  this.db.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
  .onSnapshot(function(querySnapshot){
   querySnapshot.forEach(function(doc) {
       var order = doc.data();
       // console.log(doc.id)
      self.updateTotalPrice(order.total);
      self.updateTotalQuantity(order.numItems);
      self.updatePriceString(String(order.total));
      self.updateQuantitiesString(String(order.numItems));
      self.updateProductsString(String(order.productName));
   });
   
   
    //self.events.publish('dataloaded,Date.now());

    self.publishEvent({
       foo: 'bar'
   });

   console.log("products reloaded");
   console.log(self.total_price);
});

}
updatePriceString(string) {
  this.prices_string.push(string);
}

updateQuantitiesString(string) {
  this.quantities_string.push(string);
}

updateProductsString(string) {
  this.products_string = string + ", " + this.products_string;
}

updateTotalPrice(toAdd) {
  this.total_price += <number>toAdd;
  console.log(toAdd);
  console.log(this.total_price);
}

updateTotalQuantity(toAdd) {
  this.total_quantity += <number>toAdd;
}

pushCartToFirebase(cart_id,orderDate, totalPrice, totalQuantity, products_string, quantities_string, prices_string) {
  var self = this;
  var uid=firebase.auth().currentUser.uid
    console.log(uid, " :****** uid");

 var db = firebase.firestore();
 db.collection("cart").add({
   'total_price' : totalPrice,
   'total_quantity' : totalQuantity,
   'orderDate': orderDate,
   'quantities_string' : quantities_string,
   'price_string' : prices_string,
   'products_string' : products_string,
   'uid' : uid,
   'cart_id' : cart_id

})
.then(function(docRef) {
 console.log("Document written with ID: ", docRef.id);
 
 //update this products arrays
})
.catch(function(error) {
 console.error("Error adding document: ", error);
});



}

getCart():any{var cartObservable = new Observable(observer => {
  setTimeout(() => {
      observer.next(this.cart);
  }, 1000);
  });

      return cartObservable;
}

updateProduct(id, newValues){
  console.log(newValues.id);
firebase.firestore().collection("products").doc(id).update(newValues);
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

deleteOrderFinal(id) {
  if(this.usertype == "visitor") {
    var self=this;
    var db = firebase.firestore();

    db.collection("cart").doc(id).delete().then(function() {
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

async presentNotVisitor() {
  let alert = await this.alertCtrl.create({
    message: 'You are not logged in as a visitor and cannot place an order. Please log in as a visitor to place an order.',
    buttons: [{
      text: 'Dismiss',
      handler: () => {

        console.log('No clicked');
      }}]
  });
  await alert.present();
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



