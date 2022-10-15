import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApproveComponent } from './approve/approve.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerEnqueryComponent } from './customer-enquery/customer-enquery.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    ApproveComponent,
    NewCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
})
export class CustomersModule { }
