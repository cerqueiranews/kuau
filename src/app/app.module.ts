import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GithubProvider } from '../providers/github/github';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicStorageModule.forRoot({
            driverOrder: ['indexeddb', 'sqlite', 'websql', 'localstorage']
        }),
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        GithubProvider
    ]
})
export class AppModule { }
