import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterReadingRoutingModule } from './meter-reading-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MeterReadingComponent } from './meter-reading.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { CreateReadingComponent } from './create-reading/create-reading.component';


@NgModule({
  declarations: [
    MeterReadingComponent,
    ExceptionsComponent,
    CreateReadingComponent
  ],
  imports: [
    CommonModule,
    MeterReadingRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MeterReadingModule { }
