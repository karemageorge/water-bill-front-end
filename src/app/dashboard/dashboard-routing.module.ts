import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../layouts/admin/admin.component';
import { BillsComponent } from './bills/bills.component';
import { ViewBillComponent } from './bills/view-bill/view-bill.component';
import { CustomerEnqueryComponent } from './customers/customer-enquery/customer-enquery.component';
import { IndexComponent } from './index/index.component';
import { ExceptionsComponent } from './meter-reading/exceptions/exceptions.component';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { SmssComponent } from './smss/smss.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { 
        path: 'index',
        component: IndexComponent 
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path:'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
      },
      { 
        path: 'customer-enquery',
        loadChildren: () => import('./customers/customer-enquery/customer-enquery.module').then(m => m.CustomerEnqueryModule)
      },
      { 
        path: 'meter-readings',
        loadChildren: () => import('./meter-reading/meter-reading.module').then(m => m.MeterReadingModule)
      },
      { 
        path: 'payments',
        loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule)
      },
      { 
        path: 'settings',
        component: SettingsComponent 
      },
      { 
        path: 'smss',
        loadChildren: () => import('./smss/smss.module').then(m => m.SmssModule)
      },
      { 
        path: 'bills',
        loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule)
      },
      {
        path:'tasks',
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path:'exceptions',
        component: ExceptionsComponent
      },
      {
        path:'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      { 
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
