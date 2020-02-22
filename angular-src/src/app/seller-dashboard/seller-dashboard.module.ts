import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { ProductComponent } from './product/product.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SellerJwtInterceptor } from '../_helpers/seller-jwt-interceptor';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AllProductComponent } from './all-product/all-product.component';

@NgModule({
  declarations: [DashboardComponent, Dashboard1Component, ProductComponent, AddNewProductComponent, AllProductComponent],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SellerJwtInterceptor, multi: true }
  ]
})
export class SellerDashboardModule { }
