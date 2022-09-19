import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'task', redirectTo: 'task/index', pathMatch: 'full'},
  { path: 'task/index', component: IndexComponent },
  { path: 'task/create', component: CreateComponent },
  { path: 'task/edit/:id', component: EditComponent },
  { path: 'task/user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
