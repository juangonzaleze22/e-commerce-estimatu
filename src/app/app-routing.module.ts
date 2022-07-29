import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { InstallationsGuideComponent } from './pages/installations-guide/installations-guide.component';
import { LivingRoomComponent } from './pages/living-room/living-room.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'product-detail/:idProduct', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order-tracking', component: OrderTrackingComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'living-room', component: LivingRoomComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'comming-soon', component: CommingSoonComponent },
  { path: 'installations-guide', component: InstallationsGuideComponent },
  { path: 'products-list/:categoria', component: ProductsListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
