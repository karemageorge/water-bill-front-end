import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { MaterialModule } from 'src/app/material/material.module';
import { BillsComponent } from './bills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { CreateBillDetailsComponent } from './create-bill-details/create-bill-details.component';


@NgModule({
  declarations: [
    ViewBillComponent,
    BillsComponent,
    CreateBillComponent,
    CreateBillDetailsComponent
  ],
  entryComponents:[ViewBillComponent],
  imports: [
    CommonModule,
    BillsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [
    DatePipe
  ],
})
export class BillsModule { }
