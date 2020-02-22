import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [DashboardComponent, Dashboard1Component, ProductComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class AdminDashboardModule { }
