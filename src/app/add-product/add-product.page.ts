import { Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  add_product_form: FormGroup;
  randomId = makeid(10);
  picture_taken = false;

  downloadURL = [];
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public productService: ProductService,
    private camera: Camera,
    public atrCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.add_product_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      photoUrl: new FormControl(''),
      description: new FormControl('', Validators.required)

    });
  }

  addProduct(value) {
    var self = this;  
    var storageRef = firebase.storage().ref();
    var picture_taken = false;

    if (this.productService.usertype != "owner") {
      console.log("you are not an owner, you can not add anything.");
      console.log(this.productService.usertype);
    } else {

      if(self.picture_taken){
        storageRef.child(this.randomId).getDownloadURL().then(function(url) {
          var url2 = url;
          url2.replace(self.randomId, "thumb_"+ self.randomId);
          self.productService.addProduct(value.name, value.price, value.category, url, value.description, url2);
          self.picture_taken = false;
         });
      

         
        }

      if(!self.picture_taken){
        self.productService.addProduct(value.name, value.price, value.category, value.photoUrl, value.description, value.photoUrl);
      }

     self.goBack();
    }

  }

  goBack(){
    this.router.navigate(['tabs/product-list']);//.then(()=> {
     // window.location.reload();
    //});
  }

  async pickImage() {
    var self = this;
    try {
     const options: CameraOptions = {
       quality:50,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE
     }

     const result = await this.camera.getPicture(options);
     const image = `data:image/jpeg;base64,${result}`;
     const pictures = firebase.storage().ref(this.randomId);
     pictures.putString(image, 'data_url');
     self.picture_taken = true;

   } catch(e) {
     console.error(e);
   }
   }

   async pickImageHelper(){
    let alertConfirm = await this.atrCtrl.create({
     
      message: 'If you proceed to take a picture, it will overwrite the value in photoUrl with the picture taken. Do you wish to add a picture anyways?',
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
            this.pickImage();
          }
        }
      ]
    });
    await alertConfirm.present();
   }
   

}
