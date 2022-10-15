import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReadingComponent } from './create-reading/create-reading.component';
import { ExceptionsComponent } from './exceptions/exceptions.component';
import { MeterReadingComponent } from './meter-reading.component';

const routes: Routes = [
  {
    path : '',
    component: MeterReadingComponent
  },
  {
    path : 'exceptions',
    component: ExceptionsComponent
  },
  {
    path : 'createreading',
    component: CreateReadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterReadingRoutingModule { }
