import { NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Http,  XHRBackend, RequestOptions } from '@angular/http';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { StorageService } from '../shared/storage.service';
import { BroadcastService } from '../shared/broadcast.service';
import { LogService } from '../shared/log.service';
import { ToastService } from '../shared/toast.service';
import { SocialShareService } from '../shared/social-share.service';
import { LoadingService } from '../shared/loading.service';
import { NetworkService } from '../shared/network.service';
import { ErrorNotifierService } from '../shared/error.notifier';
import { HttpInterceptor } from '../shared/http.interceptor';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './app.request.options';

import { LoginService} from '../pages/login/login.service';
import { QouteService} from '../pages/qoute/qoute.service';

// remove comment to enable production mode
enableProdMode();

export function httpFactory (
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  errorNotifier: ErrorNotifierService,
  loadingService: LoadingService,
  networkService: NetworkService,
  logService: LogService) {
    return new HttpInterceptor(
      backend,
      defaultOptions,
      errorNotifier,
      loadingService,
      networkService,
      logService
    );
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    StorageService,
    BroadcastService,
    LogService,
    LoginService,
    QouteService,
    ToastService,
    SocialShareService,
    LoadingService,
    NetworkService,
    ErrorNotifierService,
    {
      provide:Http,
      useFactory: httpFactory,
      deps: [
        XHRBackend,
        RequestOptions,
        ErrorNotifierService,
        LoadingService,
        NetworkService,
        LogService
      ]
    },
    { provide: WEBAPI_URL_TOKEN, useValue: 'http://192.168.43.108:8003' },
    { provide: RequestOptions, useClass: AppRequestOptions }
  ]
})
export class AppModule {}
