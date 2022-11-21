import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeterInventoryComponent } from './meter-inventory/meter-inventory.component';
import { MeterManagementComponent } from './meter-management.component';

const routes: Routes = [

 {
  path: '',
  component: MeterManagementComponent,
 },
 {
  path: 'meter-inventory',
  component: MeterInventoryComponent,
 } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeterManagementRoutingModule { }
