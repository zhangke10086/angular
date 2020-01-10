import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { LoginModule} from './login/login.module';
import zh from '@angular/common/locales/zh';
import {IndexModule} from './test/index/index.module';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {RouteReuseStrategy} from '@angular/router';
import {InspurRouteReuse} from './core/routereuse/routeReuse';
import {GlobalHttpInterceptor} from './core/interceptor/httpInterceptor';
import {Responseinterceptor} from './core/interceptor/responseinterceptor';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    IndexModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {provide: RouteReuseStrategy, useClass: InspurRouteReuse},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Responseinterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
