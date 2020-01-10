import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarComponent} from './car/car.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {Test2RoutingModule} from './test2-routing.module';
import {ENgxPrintModule} from 'e-ngx-print';
import {QRCodeModule} from 'angularx-qrcode';


@NgModule({
  declarations: [
    CarComponent
  ],
  imports: [
    ENgxPrintModule,
    QRCodeModule,
    CommonModule,
    NgZorroAntdModule,
    Test2RoutingModule
  ]
})
export class Test2Module { }
