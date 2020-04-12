import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {

  current_product:any;
  edit_product_form:FormGroup;


  constructor(private route: ActivatedRoute, 
    private router: Router,
    public productService: ProductService,
    public formBuilder: FormBuilder,

  ) {
    this.edit_product_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      photoUrl: new FormControl(''),
      description: new FormControl('', Validators.required)
    });

   }

  ngOnInit() {
    this.route.params.subscribe(param => {
    this.current_product = param;

    this.edit_product_form.patchValue({name:this.current_product.name});
    this.edit_product_form.patchValue({price:this.current_product.price});
    this.edit_product_form.patchValue({category:this.current_product.category});
    this.edit_product_form.patchValue({photoUrl:this.current_product.photoUrl});
    this.edit_product_form.patchValue({description:this.current_product.description});


    
  }); 
  
  }

  updateProduct(value){
      let newValues = {
      id: this.current_product.id,
      name: value.name,
      price: value.price,
      category: value.category,
      photoUrl: value.photoUrl,
      description: value.description,
      uid: this.current_product.uid
    }
    console.log("This is the new name: " + value.name);
    this.productService.updateProduct(this.current_product.id, newValues);
    this.goBack();

  }

  goBack(){
    this.router.navigate(["/product-list"]);
  }

  }


