import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginComponent } from '../pages/login/login';
import { ProfileComponent } from '../pages/profile/profile';

import { StorageService } from '../shared/storage.service';
import { BroadcastService } from '../shared/broadcast.service';
import { LogService } from '../shared/log.service';
import { ToastService } from '../shared/toast.service';
import { LoginService} from '../pages/login/login.service';
import { QouteService} from '../pages/qoute/qoute.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    StorageService,
    BroadcastService,
    LogService,
    LoginService,
    QouteService,
    ToastService
  ]
})
export class AppModule {}