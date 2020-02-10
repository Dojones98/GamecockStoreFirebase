import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  current_product = null;

  constructor(private route: ActivatedRoute, private router: Router,) { }
   

  ngOnInit() {
    this.current_product = this.route.snapshot.params;
      }

  order() {
    this.router.navigate(['tabs/product-list']);
  }
    
  



}
