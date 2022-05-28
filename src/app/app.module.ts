import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { CompareComponent } from './pages/compare/compare.component';
import { LivingRoomComponent } from './pages/living-room/living-room.component';
import { CardLivingComponent } from './components/card-living/card-living.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { InstallationsGuideComponent } from './pages/installations-guide/installations-guide.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CardCategoryComponent,
    CartComponent,
    ProfileComponent,
    ContactComponent,
    FaqComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    OrderTrackingComponent,
    OrderSuccessComponent,
    CompareComponent,
    LivingRoomComponent,
    CardLivingComponent,
    CheckoutComponent,
    WishlistComponent,
    CommingSoonComponent,
    InstallationsGuideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IvyCarouselModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
