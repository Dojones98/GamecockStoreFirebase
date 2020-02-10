import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Array<any>= [{"name":"Sweet Tea", "price":1.75, "category":"drink", "photoUrl": "assets/pint-outline.svg", "description": "A nice tall glass of sweet tea."},
  {"name":"Baseball", "price":2.99, "category": "toy", "photoUrl": "assets/baseball-outline.svg", "description": "Here is the best baseball money can buy!"},
  {"name":"Pizza", "price":3.55, "category": "food", "photoUrl": "assets/restaurant-outline.svg", "description": "A high quality slice of pizza."},
  {"name":"Bud Light", "price":2.99, "category": "drink", "photoUrl": "assets/pint-outline.svg", "description": "An Ice cold glass of Beer."},
  {"name":"Filet Mignon", "price":26.99, "category": "food", "photoUrl": "assets/restaurant-outline.svg", "description": "A big juicy steak."}];

  constructor() { }

  getProducts(){
    return this.products;
  }

  addProduct(name, price, category, photoUrl, description){
    this.products.push({
      'name' : name,
      'price' : price,
      'category' : category,
      'photoUrl' : photoUrl,
      'description' : description
    });
  }


}
