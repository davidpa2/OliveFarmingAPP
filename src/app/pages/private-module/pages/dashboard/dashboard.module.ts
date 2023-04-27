import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';



@NgModule({
  declarations: [DashboardPage],
  imports: [
    CommonModule,
    IonicModule,
    DashboardRoutingModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
