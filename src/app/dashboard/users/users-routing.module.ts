import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path : '',
    component : UsersComponent
  },
  {
    path : 'create',
    component : CreateUserComponent
  },
  {
    path : 'change-password',
    component : ChangePasswordComponent
  },
  {
    path : 'roles/:id',
    component : RolesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
