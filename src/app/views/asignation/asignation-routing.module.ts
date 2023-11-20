import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignationComponent } from './asignation/asignation.component';

const routes: Routes = [
  {
    path: '',
    component: AsignationComponent,
    data: {
      title: 'Asignación'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignationRoutingModule { }
