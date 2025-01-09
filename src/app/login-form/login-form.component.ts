import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  onSubmit(formData: NgForm) {
    //validation Template-Driven-Form
    if (formData.form.invalid) {
      return; alert('Some Details is missing!');
    }

    const enterdUserName = formData.form.value.username;
    const enterdPassword = formData.form.value.password;

    console.log(enterdUserName, enterdPassword);
    
    console.log('formData', formData);

    formData.form.reset(); //after submit all form value reset 
  }
}
