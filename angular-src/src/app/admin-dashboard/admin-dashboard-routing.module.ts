import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';


const routes: Routes = [
  // {path: '', component:LoginComponent},
  {path: '', component:DashboardComponent, 
    canActivate: [AdminGuard],
    children: [
      // {path:'', component: DashboardComponent},
      {path:'1', component: Dashboard1Component},
      // {path:'daily-sell', component: DailySellComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
