import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './bills.component';
import { CreateBillDetailsComponent } from './create-bill-details/create-bill-details.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { ViewBillComponent } from './view-bill/view-bill.component';

const routes: Routes = [
  {
    path: '',
    component: BillsComponent
  },
  {
    path: 'view-bill',
    component: ViewBillComponent
  },
  {
    path: 'create-bill',
    component: CreateBillComponent
  },
  {
    path: 'create-bill-detail',
    component: CreateBillDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
