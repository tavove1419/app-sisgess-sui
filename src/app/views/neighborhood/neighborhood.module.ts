import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeighborhoodRoutingModule } from './neighborhood-routing.module';

import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule, TabsModule, NavModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { IconModule } from '@coreui/icons-angular';
import { NeighborhoodComponent } from './neighborhood/neighborhood.component';
import { FilterNeighborhoodPipe } from 'src/app/common/pipes/filter.pipe';

@NgModule({
  declarations: [NeighborhoodComponent, FilterNeighborhoodPipe],
  imports: [
    CommonModule,
    NeighborhoodRoutingModule,
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
export class NeighborhoodModule { }
