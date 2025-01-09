import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of, Subscription } from 'rxjs';

// AbstractControl is a base class for FormControl and FormGroup classes in Angular.
//  It provides a common interface for working with form controls and form groups.
///////////this funciton is used to check email is unique or not custom validator.

// custom validator function
function mustContainQuestinMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null; // in this we learn how to create a password with custom validator.
  }
  return { doesNotContainQuestinMark: true };
}

// custom validator function
function emailIsUnique(control: AbstractControl) {
  // HTTP Request backend call to check email.
  if (control.value !== 'test@example.com') {
    return of(null); // of is used to create observable and observale is used to emit value
  }
  return of({ notUniqueEmail: true });
}

@Component({
  selector: 'app-reactive-login',
  templateUrl: './reactive-login.component.html',
  styleUrls: ['./reactive-login.component.css'],
})
export class ReactiveLoginComponent implements OnInit {
  private destryRef = inject(DestroyRef);

  //formGroup is used to create form
  form = new FormGroup({
    username: new FormControl('', {
      //validators works on form control
      validators: [Validators.required, Validators.email], // check email is valid or not
      asyncValidators: [emailIsUnique], // check email is unique or not
    }),
    password: new FormControl('', {
      validators: [
        Validators.required, // check password is required or not
        Validators.minLength(6), // check password length is 6 or not
        mustContainQuestinMark, // check password must contain ? or not
      ],
    }),
  });

  // get emailNotVAlid method is used to check email is valid or not
  get emailNotVAlid() {
    return (
      this.form.controls.username.touched && this.form.controls.username.invalid
    );
  }

  // get passwordNotValid method is used to check password is valid or not
  get passwordNotValid() {
    return (
      this.form.controls.password.touched && this.form.controls.password.invalid
    );
  }
  ngSubmit() {
    console.log('form Details', this.form);
    const enterUsername = this.form.value.username;
    const enterPassword = this.form.value.password;

    console.log('Email ----', enterUsername, 'Password ----', enterPassword);
    this.form.reset();
  }

  ngOnInit() {
    // when we reload the page we need to get the data from the local storage
    const savedForm = window.localStorage.getItem('saved-login'); // get data from local storage
    if (savedForm) {
      const loadData = JSON.parse(savedForm); // parse data store in variable
      // patch value method is used to set value in form
      this.form.patchValue({
        username: loadData.email,
        password: loadData.password,
      });
    }
    const Subscription = this.form.valueChanges // on value change
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login', // save data to session storage
            JSON.stringify({ email: value.username, password: value.password })
          );
        },
      });
    this.destryRef.onDestroy(() => {
      Subscription.unsubscribe();
    });
  }
}
