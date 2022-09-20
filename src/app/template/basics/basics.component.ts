import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface InitForm {
  productName: string,
  productPrice: number,
  productQuantity: number,
}
@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html'
})
export class BasicsComponent {

  @ViewChild('basicForm') basicForm!: NgForm;

  public initForm: InitForm = {
    productName: '',
    productPrice: 0,
    productQuantity: 0
  }

  public valueProductName(): boolean {
    return this.basicForm?.controls?.['productName']?.invalid
      && this.basicForm?.controls?.['productName']?.touched
  }

  public valueProductPrice(): boolean {
    return this.basicForm?.value?.['productPrice'] < 0
      && this.basicForm?.controls?.['productPrice']?.touched
  }

  public onSubmit(): void {
    this.basicForm.resetForm({
      productPrice: 0,
      productQuantity: 0
    });
  }

}
