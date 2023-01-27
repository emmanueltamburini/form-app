import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/shared/validator/email.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.fullNamePattern)]],
    email: ['', [Validators.required,/* Validators.email*/Validators.pattern(this.validatorService.emailPattern)], [this.emailService]],
    username: ['', [Validators.required, this.validatorService.validateUsername]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [this.validatorService.sameFields('password', 'confirmPassword')]
  }  as AbstractControlOptions);

  get errorNameMessage(): string {
    const errors = this.form.get('name')?.errors;

    if (errors && errors['required']) {
      return 'Name is required';
    } else if (errors && errors['pattern']) {
      return 'Name must be in format';
    }

    return ''
  }

  get errorEmailMessage(): string {
    const errors = this.form.get('email')?.errors;

    if (errors && errors['required']) {
      return 'Email is required';
    } else if (errors && errors['pattern']) {
      return 'Email must be in format';
    } else if (errors && errors['emailInUse']) {
      return 'Email is in use';
    }

    return ''
  }

  get errorUsernameMessage(): string {
    const errors = this.form.get('username')?.errors;

    if (errors && errors['required']) {
      return 'Username is required';
    } else if (errors && errors['invalidUsername']) {
      return 'Username cannot be "no valid"';
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

  get errorConfirmPasswordMessage(): string {
    const errors = this.form.get('confirmPassword')?.errors;

    if (errors && errors['required']) {
      return 'Confirm password is required';
    } else if (errors && errors['noEquals']) {
      return 'Confirm passsword must be equals to password';
    }

    return ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
    private emailService: EmailService
  ) { }

  public fieldNoValid(field: string): boolean {
    return !!this.form.get(field)?.invalid && !!this.form.get(field)?.touched;
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.form.markAllAsTouched();
  }
}
