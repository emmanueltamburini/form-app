import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html'
})
export class BasicsComponent implements OnInit {

/*   public basicForm: FormGroup = new FormGroup({
    productName     : new FormControl(''),
    productPrice    : new FormControl(0),
    productQuantity : new FormControl(0),
  }); */

  public basicForm: FormGroup = this.formBuilder.group({
    productName     : [null, [Validators.required, Validators.minLength(3)]],
    productPrice    : [null, [Validators.required, Validators.min(0)]],
    productQuantity : [null, [Validators.required, Validators.min(0)]],
  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basicForm.reset({
      productName     : '',
      productPrice    : 0,
      productQuantity : 0,
    });
  }

  public notValidField(field: string): boolean {
    return !!(this.basicForm.controls[field].errors &&
      this.basicForm.controls[field].touched);
  }

  public onSubmit(): void {
    if (this.basicForm.invalid) {
      this.basicForm.markAllAsTouched();
      return;
    }
    console.log(this.basicForm.value);
    this.basicForm.reset();
  }
}
