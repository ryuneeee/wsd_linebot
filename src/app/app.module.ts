import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent }       from './app.component';
import { CodeListComponent }  from './code-list/code-list.component';
import { CodeWriteComponent } from './code-write/code-write.component';
import { CodeViewComponent }  from './code-view/code-view.component';
import { CodeEditComponent }  from './code-edit/code-edit.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CodeListComponent,
    CodeWriteComponent,
    CodeViewComponent,
    CodeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
