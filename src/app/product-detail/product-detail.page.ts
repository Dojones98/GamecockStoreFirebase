import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ProductService } from '../product.service';

import { Events } from '@ionic/angular'


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  //add_order_form: FormGroup;
  current_product = null;
  total:any;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              public productService: ProductService) {
              
               }
   

  ngOnInit() {
    console.log(this.total);
    //this.current_product = this.route.snapshot.params; 
    this.route.params.subscribe(
      param => {
        this.current_product = param;
        console.log(this.current_product);

       // this.edit_item_form.patchValue({title:this.current_item.title});
       // this.edit_item_form.patchValue({description:this.current_item.description});

      });
    }
    

      


  order() {
    console.log(this.total);
    if(this.productService.usertype == 'visitor') {
         this.productService.addOrder(<number>this.current_product.price * 10,
                                   10, this.current_product.name, Date());


    this.router.navigate(['tabs/product-list']);

  }
  else{
    console.log("you are not a visitor and can not place an order")
  }
  
  }

  deleteProduct(){
    console.log(this.current_product);
    console.log(this.current_product.id+" to be deleted")
    this.productService.deleteProduct(this.current_product.id)
    this.goBack();
  }

  goBack(){
    this.router.navigate(['tabs/product-list']);
  }

    
  



}
