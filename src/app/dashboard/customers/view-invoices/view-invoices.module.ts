import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInvoicesRoutingModule } from './view-invoices-routing.module';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { ViewInvoicesComponent } from './view-invoices.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';


@NgModule({
  declarations: [
    CustomerAccountsComponent,
    ViewInvoicesComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    ViewInvoicesRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class ViewInvoicesModule { }
