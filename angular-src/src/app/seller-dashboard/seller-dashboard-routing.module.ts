import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SellerGuard } from '../_guards/seller.guard';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { ProductComponent } from './product/product.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AllProductComponent } from './all-product/all-product.component';


const routes: Routes = [
  // {path: '', component:LoginComponent},
  {path: '', component:DashboardComponent, 
    canActivate: [SellerGuard],
    children: [
      {path:'', component: Dashboard1Component},
      {path:'1', component: Dashboard1Component},
      {path:'product', component: ProductComponent,
        children: [
          {path:'', component: AllProductComponent},
          {path:'all-products', component: AllProductComponent},
          {path:'add-new-product', component: AddNewProductComponent}
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerDashboardRoutingModule { }
