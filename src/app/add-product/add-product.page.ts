import { Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  add_product_form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.add_product_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      photoUrl: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  addProduct(value) {
    this.productService.addProduct(value.name, value.price, value.category, value.photoUrl, value.description);
    this.goBack();
  }

  goBack(){
    this.router.navigate(['tabs/product-list']);
  }

}
