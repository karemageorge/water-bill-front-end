import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { PledgesComponent } from './pledges/pledges.component';
import { ViewCustomerComponent } from './view-customer.component';

const routes: Routes = [
  {
    path:':id',
    component: ViewCustomerComponent,
    children: [
      {path:'pledges', component: PledgesComponent},
      {path:'meter-reading', component: MeterReadingComponent},
      {path:'account-transactions', component: AccountTransactionsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCustomerRoutingModule { }
