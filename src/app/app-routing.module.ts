import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import {CodeWrapperComponent} from './components/code-wrapper/code-wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
    { path: ':ctxId',  component: CodeWrapperComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
