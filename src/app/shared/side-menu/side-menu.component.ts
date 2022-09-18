import { Component } from '@angular/core';
import { MenuItem } from '../interfaces/shared.interfaces';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent {
  public templateMenuItems: MenuItem[] = [
    {
      text: 'Basics',
      route: './template/basics'
    },
    {
      text: 'Dynamics',
      route: './template/dynamics'
    },
    {
      text: 'Switches',
      route: './template/switches'
    }
  ];

  public reactiveMenuItems: MenuItem[] = [
    {
      text: 'Basics',
      route: './reactive/basics'
    },
    {
      text: 'Dynamics',
      route: './reactive/dynamics'
    },
    {
      text: 'Switches',
      route: './reactive/switches'
    }
  ];
}
