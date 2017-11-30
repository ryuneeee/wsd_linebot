import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent }       from './app.component';

import { NavbarComponent } from './navbar.component';
import { LoginModalComponent } from './login.modal.component';
import { JoinModalComponent } from './join.modal.component';
import { LoggedOnComponent } from './loggedOn.component';

import { CodeListComponent }  from './code-list/code-list.component';
import { CodeWriteComponent } from './code-write/code-write.component';
import { CodeViewComponent }  from './code-view/code-view.component';
import { CodeEditComponent }  from './code-edit/code-edit.component';

import { AppRoutingModule } from './app-routing.module';

import { CodeService } from './code.service';
import { HttpService } from './http.service';

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
    HttpService,
    CodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
