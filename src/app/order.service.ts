import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { Events} from '@ionic/angular';
import { OrderDetailPage } from './order-detail/order-detail.page';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private eventSubject = new Subject<any>();

  /*orders:Array<any>= [{"orderID":"0001","numItems":"10","total":"$300.56","date":"12/1/2019"},
                      {"orderID":"0002","numItems":"6","total":"$15.20","date":"09/20/2019"},
                      {"orderID":"0003","numItems":"19","total":"$200.99","date":"09/16/2019"},
                      {"orderID":"0004","numItems":"23","total":"$23.00","date":"08/17/2019"},
                      {"orderID":"0005","numItems":"42","total":"$84.55","date":"08/1/2019"}]
*/
  usertype="visitor";
  db=firebase.firestore();
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
      var self= this;
      

      if ((this.usertype == "visitor" != null)){
        this.db.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
        .onSnapshot(function(querySnapshot){
             console.log("orders list changed...........1visitor");
             self.orders = [];
             querySnapshot.forEach(function(doc) {
                 var order = doc.data();
                 // console.log(doc.id)
                 self.orders.push({total:order.total, numItems:order.numItems, 
                                   productName:order.productName, orderDate:order.orderDate
                                   , uid:order.uid})
             });
              //self.events.publish('dataloaded,Date.now());
 
              self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("products reloaded");
         } );
      }
      else{
        this.db.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
       .onSnapshot(function(querySnapshot) {
             console.log("orders list changed...........2 owner");
             self.orders = [];
             querySnapshot.forEach(function(doc) {
                 var order = doc.data();
                 self.orders.push({total:order.total, numItems:order.numItems, 
                  productName:order.productName, orderDate:order.orderDate, uid:order.uid})
             });
 
             self.publishEvent({
                 foo: 'bar'
             });
 
             console.log("orders reloaded");
         } );
      }
     } //end of constructor

     

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
   }
   else{
      console.log(" no user logged in, no order created")
   }

   var db = firebase.firestore();
         db.collection("products").add({
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



}

