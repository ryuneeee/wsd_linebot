import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './app.component';

// login
import { NavbarComponent }     from './navbar/navbar.component';
import { LoginModalComponent } from './login-modal/login.modal.component';
import { JoinModalComponent }  from './join-modal/join.modal.component';
import { LoggedOnComponent }   from './logged-on/loggedOn.component';

// code
import { CodeListComponent }  from './code-list/code-list.component';
import { CodeWriteComponent } from './code-write/code-write.component';
import { CodeViewComponent }  from './code-view/code-view.component';
import { CodeEditComponent }  from './code-edit/code-edit.component';

import { AppRoutingModule } from './app-routing.module';

import { CodeService } from './code.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    CodeListComponent,
    CodeWriteComponent,
    CodeViewComponent,
    CodeEditComponent,
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
