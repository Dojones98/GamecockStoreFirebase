import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBE382mo8yLUmwRRYNOylThFZRJ0bpLeCE",
  authDomain: "gamecock-store-d09bb.firebaseapp.com",
  databaseURL: "https://gamecock-store-d09bb.firebaseio.com",
  projectId: "gamecock-store-d09bb",
  storageBucket: "gamecock-store-d09bb.appspot.com",
  messagingSenderId: "225894497722",
  appId: "1:225894497722:web:c5b6e2f303b1115f40f183",
  measurementId: "G-5EEPB1F4JT"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
    });
  }
}
