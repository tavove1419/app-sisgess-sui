import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';

const routes: Routes = [
  {
    path: '',
    component: NeighborhoodComponent,
    data: {
      title: 'Barrios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeighborhoodRoutingModule { }
