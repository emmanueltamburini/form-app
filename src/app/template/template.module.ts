import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { BasicsComponent } from './basics/basics.component';
import { DynamicsComponent } from './dynamics/dynamics.component';


@NgModule({
  declarations: [
    BasicsComponent,
    DynamicsComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
