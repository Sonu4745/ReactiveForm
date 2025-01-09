import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveLoginComponent } from './reactive-login/reactive-login.component';
import { PractiveFormComponent } from './practive-form/practive-form.component';
import { SingupComponent } from './auth/singup/singup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ReactiveLoginComponent,
    PractiveFormComponent,
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ReactiveFormsModule,
  FormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
