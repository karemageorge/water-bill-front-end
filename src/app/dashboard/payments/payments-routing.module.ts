import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path : '',
    component: PaymentsComponent
  },
  {
    path : 'create-payments',
    component: CreatePaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
