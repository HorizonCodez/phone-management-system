import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { ShopRegisterPageComponent } from './shop-register-page/shop-register-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user-register', component: UserRegisterPageComponent },
  { path: 'shop-register', component: ShopRegisterPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
