import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule, TabsModule, NavModule } from '@coreui/angular';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    TabsModule,
    BadgeModule,
    ButtonGroupModule,
    ButtonModule,
    NavModule,
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
export class CompanyModule { }
