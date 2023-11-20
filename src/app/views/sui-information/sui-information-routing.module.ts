import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuiInformationComponent } from './sui-information/sui-information.component';

const routes: Routes = [
  {
    path: '',
    component: SuiInformationComponent,
    data: {
      title: 'Sui'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiInformationRoutingModule { }
