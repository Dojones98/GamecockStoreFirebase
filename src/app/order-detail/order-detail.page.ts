import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  
})
export class OrderDetailPage implements OnInit {

 
  order = null;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService,
              public atrCtrl: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.order = param;
        console.log(this.order);

      });
    }

  deleteOrder(){
    console.log(this.order);
    console.log(this.order.id+" to be deleted")
    this.productService.deleteOrder(this.order.id)
    this.goBack();
  }

  goBack(){
    this.router.navigate(["/tabs/order-list"]);
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
            this.deleteOrder();
          }
        }
      ]
    });
    await alertConfirm.present();
  }

}


