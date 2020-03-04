import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,ActivatedRoute } from '@angular/router';
import {AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={
  email:"",
  password:""};

  usertype="visitor";

  constructor(private router:Router,
	private alertCtrl: AlertController) {
	
   }

  ngOnInit() {
  }

  signup(){
  	console.log(this.user.email+"  "+this.user.password)
  	var email=this.user.email;
  	var password=this.user.password;
  	var self=this;
  	console.log(this.usertype);

  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  		function(error) {
	  // Handle Errors here.
	  console.log(error);
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(error.message);
	  if(errorCode.length > 0){
	  	console.log("Failed");
	  }
	  else{
	  	console.log("signup ok")
	  }
	  // ...
	}).then(function(result){
			var user= firebase.auth().currentUser;
			 var db = firebase.firestore();
		          db.collection("usertype").add({
		            'uid':user.uid,
		              'usertype': self.usertype
		          
		      })
		      .then(function(docRef) {
		          console.log("usetyper written with ID: ", docRef.id);

		          //update this products arrays
		      })
		      .catch(function(error) {
		          console.error("Error adding document: ", error);
		      });



		  	console.log("finished creating account")
		  	console.log(user.uid)
			  // self.router.navigate(["/login"]);
			  self.signUpNotification();
		  	self.router.navigate(["/login"]);
	});


  }

  async signUpNotification() {
    let alert = await this.alertCtrl.create({
      message: 'Thank you for signing up, please input your information again on the next page to log in.',
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          console.log('No clicked');
        }}]
    });
    await alert.present();
  }

}
