import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitComponent } from './unit/unit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Registros SUI'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register'
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Registro'
        }
      },
      {
        path: 'unit',
        component: UnitComponent,
        data: {
          title: 'Registro Unidades por piso'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
