import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarComponent} from './car/car.component';


const routes: Routes = [
  /**************挂自己功能组件 */
  {
    path: 'car', component: CarComponent, data: { title: '工单管理' },
  },


  /***************挂自己功能组件 */
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Test2RoutingModule { }
