import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RainRoutingModule } from './rain-routing.module';
import { RainPage } from './rain.page';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RainPage],
  imports: [
    CommonModule,
    IonicModule,
    RainRoutingModule,
    ComponentsModule,
    FormsModule
  ]
})
export class RainModule { }
