import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../home.component';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, RegisterComponent, LoginComponent]
})
export class HomeModule { }
