import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEnqueryComponent } from './customer-enquery.component';

const routes: Routes = [
  { 
    path: '',
    component: CustomerEnqueryComponent
},
  { 
    path: 'viewcustomer',
    loadChildren: () => import('../view-customer/view-customer.module').then(m => m.ViewCustomerModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerEnqueryRoutingModule { }
