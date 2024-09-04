import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveTableComponent } from './reactive-table/reactive-table.component';
import { ReactiveUserFormComponent } from './reactive-user-form/reactive-user-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rt',
    pathMatch: 'full',
  },
  {
    path: 'rf',
    component: ReactiveUserFormComponent,
  },
  {
    path: 'rt',
    component: ReactiveTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
