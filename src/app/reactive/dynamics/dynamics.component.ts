import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html'
})
export class DynamicsComponent {

  public dynamicForm: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.formBuilder.array([
      ['favorite1']
    ], Validators.required)
  });

  public newFavorite: FormControl = this.formBuilder.nonNullable.control('', Validators.required)

  get favoritesArray(): FormArray<any>{
    return this.dynamicForm.get('favorites') as FormArray
  }

  constructor(private formBuilder: FormBuilder) { }

  public onAdd (): void {
    if(this.newFavorite.invalid) { return; }

    this.favoritesArray.push(this.formBuilder.nonNullable.control(this.newFavorite.value,  Validators.required));

    this.newFavorite.reset();
  }

  public onDelete (index: number): void {
    this.favoritesArray.removeAt(index);
  }

  public notValidField(field: string): boolean {
    return !!(this.dynamicForm.controls[field].errors &&
      this.dynamicForm.controls[field].touched);
  }

  public onSubmit(): void {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicForm.value);
    this.dynamicForm.reset({
      favorites: ['favorite1', Validators.required]
    });
  }
}
