import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  gender: string,
  notifications: boolean
}

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html'
})
export class SwitchesComponent implements OnInit {

  public switchcForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    notifications: [false, Validators.required],
    termsAndConditionsCheckBox: [false, Validators.requiredTrue],
  });

  public person: Person = {
    gender: 'F',
    notifications: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.switchcForm.reset({...this.person, termsAndConditionsCheckBox: false});

    this.switchcForm.valueChanges.subscribe(({termsAndConditionsCheckBox, ...rest}) => {
      this.person = {...rest};
    });
  }

  public onSubmit(): void {
    if (this.switchcForm.invalid) {
      this.switchcForm.markAllAsTouched();
      return;
    }
    const formValue = {...this.switchcForm.value}
    delete formValue.termsAndConditionsCheckBox;
    this.person = {...formValue};
    this.switchcForm.reset({
      gender: 'F',
      notifications: false,
      termsAndConditionsCheckBox: false,
    });
  }

}
