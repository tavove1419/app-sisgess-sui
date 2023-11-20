import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredialComponent } from './predial/predial.component';

const routes: Routes = [
  {
    path: '',
    component: PredialComponent,
    data: {
      title: 'Predial'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredialRoutingModule { }
