import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

// we have check password to confirm password
// function equalPassword(control: AbstractControl) {
//   const password = control.get('password')?.value;
//   const passwordConfirm = control.get('confirmPassword')?.value;

//   if (password === passwordConfirm) {
//     return null;
//   }
//   return { passwordsNotEqual: true };
// }

// one more method we use this function
function equalPassword(controlName1:string , controlName2:string) {
  return (control: AbstractControl)=>{

  const password = control.get(controlName1)?.value;
  const passwordConfirm = control.get(controlName2)?.value;

  if (password === passwordConfirm) {
    return null;
  }
  return { passwordsNotEqual: true };
}
}

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
  if (!passwordRegex.test(password)) {
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
  newArray: any[] = [];

  form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailValidator],
    }),
    // password: new FormControl('',{
    //   validators:[Validators.required,Validators.minLength(10),passwordValidator]
    // })

    // Nested FormGroup in formgroup
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          passwordValidator,
          // Custom validator
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8), // passwordValidator, // Custom validator
        ],
      }),
    },{
      validators:[equalPassword('password', 'confirmPassword')]
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    // we can define this type select option method by value
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    agree: new FormControl(false, { validators: [Validators.required] }),
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
    const passwordControl = this.form.get('passwords.password');
    return passwordControl?.touched && passwordControl.invalid;
  }

  onSubmit() {
    if (this.form.invalid) return console.log('Invalid Form!!!!!!');
    console.log('this.form', this.form);
    const sourceArray = this.form.get('source') as FormArray; // Get the FormArray
    const sourceValues = sourceArray.value; // Extract raw true/false values

    const detailsUserInObj = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.passwords.password,
      confirmPassword: this.form.value.passwords.confirmPassword,
      street: this.form.value.address.street,
      number: this.form.value.address.number,
      city: this.form.value.address.city,
      postCode: this.form.value.address.postCode,
      role: this.form.value.role,
      source: sourceValues, // Store the raw true/false values
    };

    if (detailsUserInObj) {
      this.newArray.push(detailsUserInObj);
      this.onReset();
    }

    console.log('this.newArray', this.newArray);
  }

  onReset() {
    this.form.reset();
  }
}
