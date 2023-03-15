import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegistrationComponent } from './Authentication/registration/registration.component';
import { ViewProfileComponent } from './navbar/view-profile/view-profile.component';
import { DashboradComponent } from './Pages/dashborad/dashborad.component';
import { GurdGuard } from './authGurd/gurd.guard';
import { HomeGurdGuard } from './authGurd/home-gurd.guard';
import { EditProfileComponent } from './navbar/edit-profile/edit-profile.component';
import { ProductsComponent } from './Pages/dashborad/products/products.component';
import { CartComponent } from './navbar/cart/cart.component';
import { AdminAuthoriseGuard } from './authGurd/admin-authorise.guard';
import { TempProductComponent } from './Pages/temp-product/temp-product.component';
import { TempAddProductsComponent } from './Pages/temp-product/temp-add/temp-add.component';
import { PaginationComponent } from './Pages/temp-product/pagination/pagination.component';
import { RequestComponent } from './Pages/request/request.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGurdGuard],
  },

  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [HomeGurdGuard],
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'view-profile',
    component: ViewProfileComponent,
    canActivate: [GurdGuard],
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent,
    canActivate: [GurdGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [GurdGuard],
  },
  {
    path: 'dashborad',
    component: DashboradComponent,
    canActivate: [AdminAuthoriseGuard, GurdGuard],
  },
  {
    path: 'products/:id',
    component: ProductsComponent,
    canActivate: [AdminAuthoriseGuard, GurdGuard],
  },

  // temp
  {
    path: 'temp-product',
    component: TempProductComponent,
    canActivate: [GurdGuard],
  },
  {
    path: 'temp-add/:id',
    component: TempAddProductsComponent,
    canActivate: [AdminAuthoriseGuard, GurdGuard],
  },
  //pagination learn
  {
    path: 'pagination',
    component: PaginationComponent,
    canActivate: [AdminAuthoriseGuard, GurdGuard],
  },
  //request for leave
  {
    path: 'request',
    component: RequestComponent,
    canActivate: [AdminAuthoriseGuard, GurdGuard],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
