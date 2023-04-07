import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-module/auth.module').then(m => m.AuthModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/public-module/public.module').then(m => m.PublicModule)
  // },
  // {
  //   path: 'private',
  //   loadChildren: () => import('./pages/private-module/private.module').then(m => m.PrivateModule),
  // }
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
