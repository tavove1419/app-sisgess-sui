import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReAsignationRoutingModule } from './re-asignation-routing.module';
import { ReAsignationComponent } from './re-asignation/re-asignation.component';

import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [ReAsignationComponent],
  imports: [
    CommonModule,
    ReAsignationRoutingModule,
    BadgeModule,
    CardModule,
    GridModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonGroupModule,
    ButtonModule,
    TableModule,
    ModalModule,
    NgxPaginationModule,
    IconModule
  ]
})
export class ReAsignationModule { }
