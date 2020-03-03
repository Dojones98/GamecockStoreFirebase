import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProductService } from '../product.service';


import * as firebase from 'firebase';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

new_item_form: FormGroup;

  //imgfile="assets/icecream.jpg";
  db = firebase.firestore();

  constructor(
  	  private router: Router,
 	    public formBuilder: FormBuilder,
 	    public productService: ProductService
 	     ) { 

  }

  ngOnInit() {

  	  	this.new_item_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  home(){
    this.router.navigate(["/tabs/product-list"]).then(() => {
      window.location.reload();
    })
  }

  signup(){
  	this.router.navigate(["/signup"]);
  }

  login(item){
  	console.log(item.email+"   "+item.password)
  	var self=this;
	var email=item.email;
	var password=item.password;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);

		if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else if (errorCode === 'auth/user-not-found'){
            alert("User does not exist");
          }
          console.log(error);
		}
	).then(function(result){
    var user= firebase.auth().currentUser;
        console.log("login succeeded");
        console.log(user.uid);

        //get my usertype from database 
        self.db.collection("usertype").where("uid", "==", user.uid)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  var type = doc.data().usertype;
                  console.log("usertype:"+type);
                  self.productService.setUsertype(type);
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });


        // firebase.auth().currentUser
		  	 self.router.navigate(["tabs/product-list"]);
		  //	this.home();
	});
  }

  loginGoogle(){
  		var self=this;
  		console.log("google login")
  		// Using a popup.
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		 // This gives you a Google Access Token.
		 var token = result.credential.providerId;
		 // The signed-in user info.
		 var user = result.user;
		 console.log(user.uid);
		 console.log("login succeeded")
     self.router.navigate(["tabs/product-list"]);
     self.productService.setUsertype("visitor");
     self.db.collection("usertype").add({
      'uid':user.uid,
        'usertype': "visitor"
    
})

    });
    
  }

}
