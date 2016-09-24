import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { StorageService } from '../../shared/storage.service';
import { LoginConfig } from '../../shared/login-config';
import { BroadcastService } from '../../shared/broadcast.service';
import { ProfileComponent } from '../profile/profile';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [LoginService]
})

export class LoginComponent {

  private isLoggedIn: boolean;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private storageService: StorageService,
    private broadcaster: BroadcastService) {
      this.isLoggedIn = false;
    }

  signinWithGoogle() {
    this.loginService.loginGoogle().then((response) => {
      this.onSuccess(response, LoginConfig.GOOGLE);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithFacebook() {
    this.loginService.loginFacebook().then((response) => {
      this.onSuccess(response, LoginConfig.FACEBOOK);
    }, (err) => {
      this.onError(err);
    });
  }

  signinWithTwitter() {
    this.loginService.loginTwitter().then((response) => {
      this.onSuccess(response, LoginConfig.TWITTER);
    }, (err) => {
      this.onError(err);
    });
  }

  private onSuccess(response: any, loginVia: number) {
    console.log(response);
    this.storeLoginResponse(response, loginVia);
    this.broadcastOnLogin(true);
    this.navCtrl.push(ProfileComponent);
  }

  private onError(err) {
    console.log(err);
    this.storageService.clearAll();
    this.broadcastOnLogin(false);
  }

  private storeLoginResponse(res: any, loginVia: number) {
    this.storageService.setObject('profile', res);
    this.storageService.setValue('loginVia', loginVia);
  }

  private broadcastOnLogin(val: boolean) {
    this.isLoggedIn = val;
    this.broadcaster.broadcast('onLogin', this.isLoggedIn);
  }

}
