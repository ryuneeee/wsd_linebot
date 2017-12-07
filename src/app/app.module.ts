import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './components/app.component';

// login
import { NavbarComponent }     from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/login-modal/login.modal.component';

// code
import {CodeHelloComponent} from './components/code-hello/code-hello.component';
import { CodeListComponent } from './components/code-list/code-list.component';
import { CodeWriteComponent } from './components/code-write/code-write.component';
import { CodeTesterComponent } from './components/code-tester/code-tester.component';
import { CodeReferenceComponent } from './components/code-reference/code-reference.component';
import { CodeWrapperComponent } from './components/code-wrapper/code-wrapper.component';

import { AppRoutingModule } from './app-routing.module';

import { CodeService } from './services/code.service';
import { UserService } from './services/user.service';
import {SessionService} from './services/session.service';

@NgModule({
  declarations: [
    AppComponent,
    CodeHelloComponent,
    CodeListComponent,
    CodeWriteComponent,
    CodeTesterComponent,
    CodeReferenceComponent,
    CodeWrapperComponent,
    LoginModalComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    AppRoutingModule,
    AceEditorModule
  ],
  providers: [
    UserService,
    CodeService,
      SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
