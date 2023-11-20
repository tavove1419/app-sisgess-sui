import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignationRoutingModule } from './asignation-routing.module';
import { AsignationComponent } from './asignation/asignation.component';

import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'


@NgModule({
  declarations: [AsignationComponent],
  imports: [
    CommonModule,
    AsignationRoutingModule,
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
    NgxPaginationModule
  ]
})
export class AsignationModule { }
