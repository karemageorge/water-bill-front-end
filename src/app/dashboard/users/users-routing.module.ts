import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
