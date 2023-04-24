import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PublicRoutingModule { }
