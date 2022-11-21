import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EquityPaymentsComponent } from './equity-payments/equity-payments.component';
import { MpesaPaymentsComponent } from './mpesa-payments/mpesa-payments.component';
import { PaymentExceptionsComponent } from './payment-exceptions/payment-exceptions.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    CreatePaymentComponent,
    EquityPaymentsComponent,
    MpesaPaymentsComponent,
    PaymentExceptionsComponent
  ],
  entryComponents:[EquityPaymentsComponent, MpesaPaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PaymentsModule { }
