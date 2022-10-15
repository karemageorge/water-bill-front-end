import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { SendbillComponent } from './sendbill/sendbill.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';
import { SmssComponent } from './smss.component';

const routes: Routes = [
  {path:"", component: SmssComponent},
  {path:"campaign", component: CampaignComponent},
  {path:"sendbill", component: SendbillComponent},
  {path:"sendmessage", component: SendmessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmssRoutingModule { }
