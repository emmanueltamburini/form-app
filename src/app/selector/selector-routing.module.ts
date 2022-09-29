import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NestedSelectorsComponent } from './pages/nested-selectors/nested-selectors.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'nested-selectors', component: NestedSelectorsComponent },
      { path: '**', redirectTo: 'nested-selectors'  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorRoutingModule { }
