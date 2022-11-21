import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { PaymentExceptionsComponent } from './payment-exceptions/payment-exceptions.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path : '',
    component: PaymentsComponent
  },
  {
    path : 'create-payments',
    component: CreatePaymentComponent
  },
  {
    path : 'payment-exceptions',
    component: PaymentExceptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
