import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders:Array<any>= [{"orderID":"0001","numItems":"10","total":"$300.56","date":"12/1/2019"},
                      {"orderID":"0002","numItems":"6","total":"$15.20","date":"09/20/2019"},
                      {"orderID":"0003","numItems":"19","total":"$200.99","date":"09/16/2019"},
                      {"orderID":"0004","numItems":"23","total":"$23.00","date":"08/17/2019"},
                      {"orderID":"0005","numItems":"42","total":"$84.55","date":"08/1/2019"}]

  constructor() { }

  getOrders(){
    return this.orders;
  }
}

