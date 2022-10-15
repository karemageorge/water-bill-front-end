import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
},
{
  path: 'report-form/:id',
  component: ReportFormComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
