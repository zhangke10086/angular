import { NgModule } from '@angular/core';

import { IndexComponent } from './index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {EmptyComponent} from './empty/empty.component';
import { UsercenterComponent } from './usercenter/usercenter.component';
import {FormsModule} from '@angular/forms';
import {User} from '../../login/entity/User';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {
        path: 'welcome', component: WelcomeComponent, data: {reuse: false, track: false}
      },
      {
        path: 'test2', loadChildren: () => import('../test2/test2.module').then(m => m.Test2Module)
      },
      {
        path: 'empty', component: EmptyComponent, data: {reuse: false, track: false}
      },
      {
        path: 'usercenter', component: UsercenterComponent, data: {reuse: false, track: false}
      },
    ], data: {reuse: false, track: false}
  }
];
@NgModule({
  imports: [
    NgZorroAntdModule,
    RouterModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  declarations: [
    IndexComponent,
    WelcomeComponent,
    EmptyComponent,
    UsercenterComponent
  ],
  exports: [IndexComponent],
  providers: [
    {provide: User}
  ],
})
export class IndexModule { }
