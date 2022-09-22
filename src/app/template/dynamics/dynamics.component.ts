import { Component } from '@angular/core';

interface Person {
  name: string,
  favorites: Favorite[]
}

interface Favorite {
  id: number,
  name: string
}

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html'
})
export class DynamicsComponent {

  public newFavorite: string = '';

  public person: Person = {
    name: '',
    favorites: [
      {id: 1, name: ''}
    ]
  }

  public onSubmit(): void {

  }

  public onAdd(): void {
    const newFavorite: Favorite = {
      id: this.person.favorites.length + 1,
      name: this.newFavorite
    }
    this.person.favorites.push({...newFavorite});
    this.newFavorite = '';
  }

  public onDelete(index: number): void {
    this.person.favorites.splice(index, 1);
  }
}
