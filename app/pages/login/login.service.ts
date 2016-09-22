import { Injectable } from '@angular/core';
import { GooglePlus, Facebook, TwitterConnect } from 'ionic-native';
import { StorageService} from './storage.service';
import { LoginConfig } from '../../shared/login-config';

@Injectable()
export class LoginService {

  private loginVia: number;

  constructor(private storageService: StorageService) {}

  public Google() {
    return GooglePlus.login();
  }

  public Facebook() {
    return Facebook.login(['public_profile']);
  }

  public Twitter() {
    return TwitterConnect.login();
  }

  public Logout() {

    this.storageService.getValue('loginVia').then((loginVia) => {
      this.loginVia = parseInt(loginVia);
    });

    if (this.loginVia == LoginConfig.GOOGLE) {
      GooglePlus.logout().then((response) => {
        this.onLogoutSuccess(response);
      }, (err) => {
        this.onLogoutError(err);
      });
    }

    if (this.loginVia == LoginConfig.FACEBOOK) {
      Facebook.logout().then((response) => {
        this.onLogoutSuccess(response);
      }, (err) => {
        this.onLogoutError(err);
      });
    }

    if (this.loginVia == LoginConfig.TWITTER) {
      TwitterConnect.logout().then((response) => {
        this.onLogoutSuccess(response);
      }, (err) => {
        this.onLogoutError(err);
      });
    }

  }

  private onLogoutSuccess(response) {
    console.log(JSON.stringify(response));
    this.storageService.clearAll();
  }

  private onLogoutError(err) {
    console.log(JSON.stringify(err));
    this.storageService.clearAll();
  }
}
