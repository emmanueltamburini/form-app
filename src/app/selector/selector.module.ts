import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorRoutingModule } from './selector-routing.module';
import { NestedSelectorsComponent } from './pages/nested-selectors/nested-selectors.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NestedSelectorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectorRoutingModule
  ]
})
export class SelectorModule { }
