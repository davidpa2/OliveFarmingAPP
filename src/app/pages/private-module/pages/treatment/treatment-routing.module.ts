import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatmentPage } from './treatment.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentPageRoutingModule {}
