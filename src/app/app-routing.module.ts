import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'template', loadChildren: () => import('./template/template.module').then(m => m.TemplateModule) },
      { path: 'reactive', loadChildren: () => import('./reactive/reactive.module').then(m => m.ReactiveModule) },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: 'selector', loadChildren: () => import('./selector/selector.module').then(m => m.SelectorModule) },
      { path: '**', redirectTo: 'template'  },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
