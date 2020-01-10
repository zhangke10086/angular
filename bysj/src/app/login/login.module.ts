import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule, RouteReuseStrategy} from '@angular/router';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzIconModule} from 'ng-zorro-antd';
import {User} from './entity/User';
import {Role} from './entity/Role';


const routes: Routes = [
  {path: '', component: LoginComponent, data: {reuse: false, track: false}}
];
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NzIconModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {provide: User},
    {provide: Role},
  ],
})
export class LoginModule { }
