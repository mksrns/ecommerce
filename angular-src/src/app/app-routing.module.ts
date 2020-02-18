import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './_components/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { ProductsComponent } from './_components/products/products.component';
import { SingleProductComponent } from './_components/single-product/single-product.component';


const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '', component: HomepageComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:productId', component: SingleProductComponent},
  {
    path:'admin-dashboard',
    loadChildren:'./admin-dashboard/admin-dashboard.module#AdminDashboardModule'
  },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
