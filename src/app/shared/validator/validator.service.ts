import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public fullNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern   : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public validateUsername = (control: AbstractControl) : ValidationErrors | null => {
    const value: string = control.value?.trim().toLowerCase();
    if (value === 'novalid') {
      return {
        invalidUsername: true
      }
    }

    return null;
  }

  public sameFields = (field: string, secondField: string) : (group: AbstractControl) => ValidationErrors | null => {

    return (group: AbstractControl) : ValidationErrors | null => {
      if (group.get(field)?.value !== group.get(secondField)?.value) {
        group.get(secondField)?.setErrors({noEquals: true});
        return {
          noEquals: true
        };
      }
      if (!group.get(secondField)?.errors?.['required']) {
        group.get(secondField)?.setErrors(null);
      }
      return null;
    }
  }
}
