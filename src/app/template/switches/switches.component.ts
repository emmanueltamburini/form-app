import { Component } from '@angular/core';

  interface Person {
    gender: string,
    notifications: boolean
  }

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent {

  public person: Person = {
    gender: 'F',
    notifications: false
  }

  public termsAndConditions: boolean = false;

}
