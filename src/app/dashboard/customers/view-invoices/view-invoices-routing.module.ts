import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { ViewInvoicesComponent } from './view-invoices.component';

const routes: Routes = [
  {
    path:':id/:invoid',
    component: ViewInvoicesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewInvoicesRoutingModule { }
