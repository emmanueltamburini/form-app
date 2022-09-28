import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/shared/validator/login.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required,/* Validators.email*/Validators.pattern(this.validatorService.emailPattern)], [this.loginService]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get errorEmailMessage(): string {
    const errors = this.form.get('email')?.errors;

    if (errors && errors['required']) {
      return 'Email is required';
    } else if (errors && errors['pattern']) {
      return 'Email must be in format';
    } else if (errors && errors['emailNoRegister']) {
      return 'Email is not register';
    }

    return ''
  }

  get errorPasswordMessage(): string {
    const errors = this.form.get('password')?.errors;

    if (errors && errors['required']) {
      return 'Password is required';
    } else if (errors && errors['minlength']) {
      return `Password must be greater than ${errors['minlength'].requiredLength}`;
    }

    return ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private loginService: LoginService
  ) { }

  public fieldNoValid(field: string): boolean {
    return !!this.form.get(field)?.invalid && !!this.form.get(field)?.touched;
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.form.markAllAsTouched();
  }
}
