import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiInformationRoutingModule } from './sui-information-routing.module';
import { SuiInformationComponent } from './sui-information/sui-information.component';

import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { IconModule } from '@coreui/icons-angular';
import { FilterInfoSuiPipe } from 'src/app/common/pipes/filter.pipe';

@NgModule({
  declarations: [SuiInformationComponent, FilterInfoSuiPipe],
  imports: [
    CommonModule,
    SuiInformationRoutingModule,
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
export class SuiInformationModule { }
