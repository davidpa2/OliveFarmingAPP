import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [LoginPage],
  imports: [
    ComponentsModule,
    CommonModule,
    LoginRoutingModule,
    IonicModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LoginPageModule { }
