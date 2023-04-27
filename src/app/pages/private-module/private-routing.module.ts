import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'rain', loadChildren: () => import('./pages/rain/rain.module').then(m => m.RainModule)
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PrivateRoutingModule { }
