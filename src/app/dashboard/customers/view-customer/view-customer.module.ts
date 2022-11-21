import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCustomerRoutingModule } from './view-customer-routing.module';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { PledgesComponent } from './pledges/pledges.component';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { ViewCustomerComponent } from './view-customer.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountTransactionsComponent,
    PledgesComponent,
    MeterReadingComponent,
    ViewCustomerComponent
  ],
  imports: [
    CommonModule,
    ViewCustomerRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ViewCustomerModule { }
