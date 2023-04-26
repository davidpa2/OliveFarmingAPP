import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PrivateRoutingModule { }
