import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReAsignationComponent } from './re-asignation/re-asignation.component';

const routes: Routes = [
  {
    path: '',
    component: ReAsignationComponent,
    data: {
      title: 'Re-Asignación'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReAsignationRoutingModule { }
