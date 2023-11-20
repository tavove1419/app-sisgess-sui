import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TypologyComponent } from './typology/typology/typology.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: {
      title: 'Usuario'
    }
  },
  {
    path: 'typology',
    component: TypologyComponent,
    data: {
      title: 'Tipologia'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
