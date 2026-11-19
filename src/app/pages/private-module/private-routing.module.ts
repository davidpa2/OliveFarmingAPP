import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceGuard } from 'src/app/services/auth/auth.service.guard';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthServiceGuard]
  },
  {
    path: 'rain', loadChildren: () => import('./pages/rain/rain.module').then(m => m.RainModule), canActivate: [AuthServiceGuard]
  },
  {
    path: 'treatment',
    loadChildren: () => import('./pages/treatment/treatment.module').then( m => m.TreatmentPagePageModule)
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PrivateRoutingModule { }
