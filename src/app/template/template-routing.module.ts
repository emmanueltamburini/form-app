import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchesComponent } from '../templates/switches/switches.component';
import { BasicsComponent } from './basics/basics.component';
import { DynamicsComponent } from './dynamics/dynamics.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'basics', component: BasicsComponent },
      { path: 'dynamics', component: DynamicsComponent },
      { path: 'switches', component: SwitchesComponent },
      { path: '**', redirectTo: 'basics'  },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TemplateRoutingModule { }
