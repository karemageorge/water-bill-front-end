import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateTaskComponent } from './create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { ReadMeterComponent } from './read-meter/read-meter.component';
import { SewerComponent } from './sewer/sewer.component';




@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    DisconnectComponent,
    ReadMeterComponent,
    SewerComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers : [
    DatePipe
  ],
  entryComponents: [CreateTaskComponent]
})
export class TasksModule { }
