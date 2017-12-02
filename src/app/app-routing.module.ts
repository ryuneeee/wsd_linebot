import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeListComponent } from './components/code-list/code-list.component';
import { CodeWriteComponent } from './components/code-write/code-write.component';
import { CodeViewComponent } from './components/code-view/code-view.component';
import { CodeEditComponent } from './components/code-edit/code-edit.component';
import { AppComponent } from './components/app.component';
import { LoggedOnComponent } from './components/logged-on/loggedOn.component';
import {CodeWrapperComponent} from './components/code-wrapper/code-wrapper.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: LogoutComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'list/:id',  component: CodeListComponent },
  // { path: 'write/:id', component: CodeWriteComponent },
  // { path: 'view/:id',  component: CodeViewComponent },
  // { path: 'edit/:id',  component: CodeEditComponent },
  { path: ':ctxId',  component: CodeWrapperComponent},
    { path: 'main', component: AppComponent}
    // { path: 'menu', component: LoggedOnComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
