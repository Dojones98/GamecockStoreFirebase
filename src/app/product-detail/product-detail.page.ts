import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
              public productService: ProductService,
              public atrCtrl: AlertController) {
              
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
    let dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
     var newdate = day + "/" + month + "/" + year;
    console.log(this.total);
    if(this.productService.usertype == 'visitor') {
         this.productService.addOrder(<number>this.current_product.price * this.total,
                                   this.total, this.current_product.name, newdate);


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
  async showConfirmAlert() {
    let alertConfirm = await this.atrCtrl.create({
     
      message: 'Are You Sure to delete this product?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.deleteProduct();
          }
        }
      ]
    });
    await alertConfirm.present();
  }


    
  



}
