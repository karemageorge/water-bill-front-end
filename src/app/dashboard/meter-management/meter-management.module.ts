import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeterManagementRoutingModule } from './meter-management-routing.module';
import { MeterManagementComponent } from './meter-management.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RequisitionComponent } from './requisition/requisition.component';
import { IssuingApprovalComponent } from './issuing-approval/issuing-approval.component';
import { ReplacementApprovalComponent } from './replacement-approval/replacement-approval.component';
import { StoreApprovalsComponent } from './store-approvals/store-approvals.component';
import { GroundInstallationComponent } from './ground-installation/ground-installation.component';
import { FieldApprovalsComponent } from './field-approvals/field-approvals.component';
import { MeterInventoryComponent } from './meter-inventory/meter-inventory.component';
import { FormsModule } from '@angular/forms';
import { AddMeterRequestsComponent } from './add-meter-requests/add-meter-requests.component';


@NgModule({
  declarations: [
    MeterManagementComponent,
    RequisitionComponent,
    IssuingApprovalComponent,
    ReplacementApprovalComponent,
    StoreApprovalsComponent,
    GroundInstallationComponent,
    FieldApprovalsComponent,
    MeterInventoryComponent,
    AddMeterRequestsComponent
  ],
  imports: [
    CommonModule,
    MeterManagementRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class MeterManagementModule { }
