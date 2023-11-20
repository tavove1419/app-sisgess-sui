import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredialRoutingModule } from './predial-routing.module';
import { PredialComponent } from './predial/predial.component';
import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/common/pipes/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    PredialComponent, FilterPipe
  ],
  imports: [
    CommonModule,
    PredialRoutingModule,
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
  ],
  providers: []
})
export class PredialModule { }
