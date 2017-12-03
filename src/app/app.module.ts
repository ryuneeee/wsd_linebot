import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './components/app.component';

// login
import { NavbarComponent }     from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/login-modal/login.modal.component';
import { JoinModalComponent }  from './components/join-modal/join.modal.component';
import { LoggedOnComponent }   from './components/logged-on/loggedOn.component';

// code
import { CodeListComponent } from './components/code-list/code-list.component';
import { CodeWriteComponent } from './components/code-write/code-write.component';
import { CodeTesterComponent } from './components/code-tester/code-tester.component';
import { CodeReferenceComponent } from './components/code-reference/code-reference.component';
import { CodeWrapperComponent } from './components/code-wrapper/code-wrapper.component';

import { AppRoutingModule } from './app-routing.module';

import { CodeService } from './services/code.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    CodeListComponent,
    CodeWriteComponent,
    CodeTesterComponent,
    CodeReferenceComponent,
    CodeWrapperComponent,
    LoginModalComponent,
    JoinModalComponent,
    NavbarComponent,
    LoggedOnComponent
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
    CodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
