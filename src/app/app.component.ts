import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reative-form';
  // reactiveForm: FormGroup = new FormGroup({});
  reactiveForm!: FormGroup; 
  
  ngOnInit(){
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      userName: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      street: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      region: new FormControl(null),
      postCode: new FormControl(null),
    })
  }

  onSubmit(){
    console.log('Reactive Form', this.reactiveForm.value.firstName);
   
  }

}
