import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { ShopRegisterPageComponent } from './shop-register-page/shop-register-page.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ViewListingComponent } from './view-listing/view-listing.component';
import { GalleryModule } from 'ng-gallery';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { ShopItemsPageComponent } from './shop-items-page/shop-items-page.component';
import { ShopOrdersPageComponent } from './shop-orders-page/shop-orders-page.component';
import { ShopAddItemComponent } from './shop-add-item/shop-add-item.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    HomePageComponent,
    LoginPageComponent,
    UserRegisterPageComponent,
    ShopRegisterPageComponent,
    ListingCardComponent,
    ViewListingComponent,
    ShopItemsPageComponent,
    ShopOrdersPageComponent,
    ShopAddItemComponent,
    OrderCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GalleryModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  imports: [BrowserModule, AppRoutingModule, GalleryModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
