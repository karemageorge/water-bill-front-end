import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RolesComponent } from './roles/roles.component';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    ChangePasswordComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTreeModule,
  ]
})
export class UsersModule { }
