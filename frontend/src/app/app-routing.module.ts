import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { ShopRegisterPageComponent } from './shop-register-page/shop-register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewListingComponent } from './view-listing/view-listing.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user-register', component: UserRegisterPageComponent },
  { path: 'shop-register', component: ShopRegisterPageComponent },
  { path: 'view-listing/:id', component: ViewListingComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
