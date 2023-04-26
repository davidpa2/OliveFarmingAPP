import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexPage } from './index.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [IndexPage],
  imports: [
    CommonModule,
    IndexRoutingModule,
    ComponentsModule,
    IonicModule
  ]
})
export class IndexModule { }
