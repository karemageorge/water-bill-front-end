import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from '../layouts/admin/admin.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { MainsidebarComponent } from '../layouts/mainsidebar/mainsidebar.component';
import { RightnavbarComponent } from '../layouts/rightnavbar/rightnavbar.component';
import { SmssComponent } from './smss/smss.component';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { PaymentsComponent } from './payments/payments.component';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '../material/material.module';
import { ExceptionsComponent } from './meter-reading/exceptions/exceptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports/reports.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerEnqueryComponent } from './customers/customer-enquery/customer-enquery.component';
// import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  declarations: [
    IndexComponent,
    AdminComponent,
    RightnavbarComponent,
    MainsidebarComponent,
    FooterComponent,
    SettingsComponent,
    CustomerEnqueryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
