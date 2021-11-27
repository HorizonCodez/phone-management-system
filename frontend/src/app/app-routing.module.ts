import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { ShopRegisterPageComponent } from './shop-register-page/shop-register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { AuthGuard } from './auth/auth.guard';
import { ShopItemsPageComponent } from './shop-items-page/shop-items-page.component';
import { ShopOrdersPageComponent } from './shop-orders-page/shop-orders-page.component';
import { ShopAddItemComponent } from './shop-add-item/shop-add-item.component';
import { OrderCreateComponent } from './order-create/order-create.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterPageComponent,
  },
  {
    path: 'shop-items',
    component: ShopItemsPageComponent,
  },
  {
    path: 'shop-add-item',
    component: ShopAddItemComponent,
  },
  {
    path: 'shop-orders',
    component: ShopOrdersPageComponent,
  },
  {
    path: 'shop-register',
    component: ShopRegisterPageComponent,
  },
  {
    path: 'create-order/:itemId',
    component: OrderCreateComponent,
  },
  { path: 'view-listing/:id', component: ViewListingComponent },

  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
