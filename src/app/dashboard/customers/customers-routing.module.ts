import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './approve/approve.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerEnqueryComponent } from './customer-enquery/customer-enquery.component';
import { CustomersComponent } from './customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { ViewInvoicesComponent } from './view-invoices/view-invoices.component';

const routes: Routes = [
  {
    path:'',
    component: CustomersComponent,
  },
  { 
      path: 'createcustomer',
      component: CreateCustomerComponent 
  },
  { 
    path: 'approvecustomer',
    component: ApproveComponent 
  },
{ 
  path: 'newcustomer',
  component: NewCustomerComponent
},
{ 
  path: 'view-invoices',
  loadChildren: () => import('./view-invoices/view-invoices.module').then(m => m.ViewInvoicesModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
