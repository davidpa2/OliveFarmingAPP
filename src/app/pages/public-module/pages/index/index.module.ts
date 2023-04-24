import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndexPage } from './index.component';



@NgModule({
  declarations: [IndexPage],
  imports: [
    CommonModule,
    IndexRoutingModule,
    ComponentsModule
  ]
})
export class IndexModule { }
