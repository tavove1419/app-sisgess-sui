import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { UserComponent } from './user/user.component';
import { BadgeModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, TableModule, ModalModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUserPipe } from 'src/app/common/pipes/filter.pipe';
import {NgxPaginationModule} from 'ngx-pagination'
import { TypologyComponent } from './typology/typology/typology.component';
import { IconModule } from '@coreui/icons-angular';


@NgModule({
  declarations: [UserComponent, FilterUserPipe, TypologyComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
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
export class ConfigModule { }
