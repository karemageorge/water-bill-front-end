import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";



const appRoutes: Routes = [
  {path:'login.action', component: LoginComponent},
  {path:'admin',loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  ];

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]  
})
export class AppRoutingModule {

}