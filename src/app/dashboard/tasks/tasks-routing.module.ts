import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { ReadMeterComponent } from './read-meter/read-meter.component';
import { SewerComponent } from './sewer/sewer.component';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path : '',
    component : TasksComponent
  },
  {
    path : 'disconnect',
    component : DisconnectComponent
  },
  {
    path : 'read-meter',
    component : ReadMeterComponent
  },
  {
    path : 'sewer',
    component : SewerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
