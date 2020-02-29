import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  
})
export class OrderDetailPage implements OnInit {

 
  order = null;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productService: ProductService) { }

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

}


