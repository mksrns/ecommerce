import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { ProductsComponent } from './_components/products/products.component';
import { SingleProductComponent } from './_components/single-product/single-product.component';
import { PagenotfoundComponent } from './_components/pagenotfound/pagenotfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { httpInterceptorProviders } from './_helpers';
import { NavbarComponent } from './_components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ProductsComponent,
    SingleProductComponent,
    PagenotfoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularMaterialModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
