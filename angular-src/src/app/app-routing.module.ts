import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './_components/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { ProductsComponent } from './_components/products/products.component';
import { SingleProductComponent } from './_components/single-product/single-product.component';
import { AdminGuard } from './_guards/admin.guard';
import { SellerGuard } from './_guards/seller.guard';
import { ProfileComponent } from './_components/profile/profile.component';
import { UserGuard } from './_guards/user.guard';


const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '', component: HomepageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:productId', component: SingleProductComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  {
    path:'admin-dashboard', 
    loadChildren:'./admin-dashboard/admin-dashboard.module#AdminDashboardModule'
  },
  {
    path:'seller-dashboard', 
    loadChildren:'./seller-dashboard/seller-dashboard.module#SellerDashboardModule'
  },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
