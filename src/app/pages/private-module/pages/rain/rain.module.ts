import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainRoutingModule } from './rain-routing.module';
import { RainPage } from './rain.page';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [RainPage],
  imports: [
    CommonModule,
    IonicModule,
    RainRoutingModule,
    ComponentsModule
  ]
})
export class RainModule { }
