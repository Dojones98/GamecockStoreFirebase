import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  imgFile = "/assets/cover.png";

  products = [
    {"name":"Coke", "price":"3.00", "category": "toy", "photoUrl": "www.com", "description": "this is some shit"}];

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log(this.products.length);
  }

  goToProduct(product){
  	console.log(product);
  	this.router.navigate(["/product-detail", product]);

  }

  openAddProductPage(){
    this.router.navigate(["/add-product"]);
  }

}
