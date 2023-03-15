import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './Authentication/registration/registration.component';
import { HomeComponent } from './Pages/home/home.component';
import { ViewProfileComponent } from './navbar/view-profile/view-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthoraztionService } from './Services/authoraztion.service';
import { DashboradComponent } from './Pages/dashborad/dashborad.component';
import { AuthService } from './authGurd/auth.service';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { EditProfileComponent } from './navbar/edit-profile/edit-profile.component';
import { ProductsComponent } from './Pages/dashborad/products/products.component';
import { CartComponent } from './navbar/cart/cart.component';
import { TempProductComponent } from './Pages/temp-product/temp-product.component';
import { HttpClientModule } from '@angular/common/http';
import { TempAddProductsComponent } from './Pages/temp-product/temp-add/temp-add.component';
import { PaginationComponent } from './Pages/temp-product/pagination/pagination.component';
import { RequestComponent } from './Pages/request/request.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    HomeComponent,
    ViewProfileComponent,
    DashboradComponent,
    BlankComponent,
    FullComponent,
    EditProfileComponent,
    ProductsComponent,
    CartComponent,
    TempProductComponent,
    TempAddProductsComponent,
    PaginationComponent,
    RequestComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
  ],

  exports: [RouterModule],

  providers: [AuthoraztionService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
