import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

// email custom validtaor function
function emailValidator(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null); // of is used to create observable and observale is used to emit value
  }
  return of({ notUniqueEmail: true });
}

//password custom validtaor function
function passwordValidator(control: AbstractControl) {
  const password = control.value;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password && !passwordRegex.test(password)) {
    return { invalidPassword: true };
  }
  return null;
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailValidator],
    }),
    // password: new FormControl('',{
    //   validators:[Validators.required,Validators.minLength(10),passwordValidator]
    // })
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        passwordValidator, // Custom validator
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8), // passwordValidator, // Custom validator
      ],
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    street: new FormControl('', { validators: [Validators.required] }),
    number: new FormControl('', { validators: [Validators.required] }),
    postCode: new FormControl('', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    // we can define this type select option method by value
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree:new FormControl(false,{validators:[Validators.required]})
  });

  //  create a get function to valid or not email

  // get invalidEmail() {
  //   const control = this.form.controls.email;
  //   return (
  //     control.touched &&
  //     (control.hasError('required') || control.hasError('email'))
  //   );
  // }

  get invalidEmail() {
    return (
      this.form.controls['email'].touched && this.form.controls['email'].invalid
    );
  }

  //  create a get function to valid or not password
  get invalidPassword() {
    return this.form.controls['password'].touched;
  }

  onSubmit() {
    // console.log(this.form.value);
    const enterEmail = this.form.value.email;
    const enterPassword = this.form.value.password;
    const enterFirstName = this.form.value.firstName;
    const enterLastName = this.form.value.lastName;
    const enterStreet = this.form.value.street;
    const enterNumber = this.form.value.number;
    const enterCity = this.form.value.city;
    const enterPostCode = this.form.value.postCode;

    console.log('Email ----', enterEmail, 'Password ----', enterPassword);
  }

  onReset() {
    this.form.reset();
  }
}
