import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ReportFormComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
