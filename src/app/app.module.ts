import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { LoginModalComponent } from './login.modal.component';
import { JoinModalComponent } from "./join.modal.component";

@NgModule({
  declarations: [
    AppComponent,
      LoginModalComponent,
      JoinModalComponent,
      NavbarComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
