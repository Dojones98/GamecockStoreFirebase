import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail-final',
  templateUrl: './order-detail-final.page.html',
  styleUrls: ['./order-detail-final.page.scss'],
})
export class OrderDetailFinalPage implements OnInit {

  cart = null;
  product_array = [];
  price_array = [];
  quantities_array = [];

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService,
              public atrCtrl: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.cart = param;
        console.log(this.cart);

      });
      this.product_array = this.cart.products_string;
      this.price_array = this.cart.price_string;
      this.quantities_array = this.cart.quantities_string;

    }

  deleteOrderFinal(){
    console.log(this.cart);
    console.log(this.cart.id+" to be deleted")
    this.productService.deleteOrderFinal(this.cart.id)
    this.goBack();
  }

  goBack(){
    this.router.navigate(["/tabs/order-list-final"]);
  }

  async deleteOrderHelper() {
    let alertConfirm = await this.atrCtrl.create({
     
      message: 'Are you sure you want to delete this order?',
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
            this.deleteOrderFinal();
          }
        }
      ]
    });
    await alertConfirm.present();
  }
}
