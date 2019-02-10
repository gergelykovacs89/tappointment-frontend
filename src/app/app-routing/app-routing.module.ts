import { NgModule } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../home/login/login.component';
import {RegisterComponent} from '../home/register/register.component';
import {CheckoutComponent} from '../home/checkout/checkout.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
