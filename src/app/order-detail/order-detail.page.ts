import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  order = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.order = this.route.snapshot.params;
  }

  deleteOrder(){
    console.log(this.order);
    console.log(this.order.id+" to be deleted")
    this.order.deleteProduct(this.order.id)
    this.goBack();
  }

  goBack(){
    this.router.navigate(["/tabs/order-list"]);
  }

}


