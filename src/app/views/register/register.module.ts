import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { UnitComponent } from './unit/unit.component';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [RegisterComponent, UnitComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    BadgeModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    TableModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    IconModule
  ]
})
export class RegisterModule { }
