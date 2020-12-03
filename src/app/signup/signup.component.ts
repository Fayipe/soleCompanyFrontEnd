
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { UserService } from '@app/_services';

import { debounceTime, first } from 'rxjs/operators';

import { Product } from './Product';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  customer = new Product();
  emailMessage: string;
  imageSrc: string;
  loading = false;
  submitted = false;

  get products(): FormArray {
    return this.userForm.get('products') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder, public userServices: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      file: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      products: this.fb.array([this.buildProducts()])
    });


    const emailControl = this.userForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  addProduct(): void {
    this.products.push(this.buildProducts());
  }

  buildProducts(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productCurrency: ['', Validators.required]
    });
  }

  submitData(): void {
    this.loading = true;
    const dob = this.userForm.value.dob;
    this.userForm.controls.dob.setValue(dob.day + '/' + dob.month + '/' + dob.year);
    console.log(this.userForm.value);

    this.userServices.createUser(this.userForm.value)
      .subscribe(
        data => {
          if (data["status"]) {
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
        });
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.userForm.patchValue({
          file: reader.result
        });
      };
    }
  }
  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

}
