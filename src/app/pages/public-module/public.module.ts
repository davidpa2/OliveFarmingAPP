import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ComponentsModule
  ]
})
export class PublicModule { }
