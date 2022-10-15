import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmssRoutingModule } from './smss-routing.module';
import { SmssComponent } from './smss.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CampaignComponent } from './campaign/campaign.component';
import { SendbillComponent } from './sendbill/sendbill.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';


@NgModule({
  declarations: [
    SmssComponent,
    CampaignComponent,
    SendbillComponent,
    SendmessageComponent,
  ],
  imports: [
    CommonModule,
    SmssRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SmssModule { }
