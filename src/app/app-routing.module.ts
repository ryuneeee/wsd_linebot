import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeListComponent }  from './code-list/code-list.component';
import { CodeWriteComponent } from './code-write/code-write.component';
import { CodeViewComponent }  from './code-view/code-view.component';
import { CodeEditComponent }  from './code-edit/code-edit.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  //{ path: 'logout', component: LogoutComponent },
  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'list/:id',  component: CodeListComponent },
  { path: 'write/:id', component: CodeWriteComponent },
  { path: 'view/:id',  component: CodeViewComponent },
  { path: 'edit/:id',  component: CodeEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
