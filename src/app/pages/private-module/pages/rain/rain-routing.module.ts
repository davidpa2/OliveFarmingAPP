import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RainPage } from './rain.page';

const routes: Routes = [
  {
    path: '', component: RainPage
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RainRoutingModule { }
