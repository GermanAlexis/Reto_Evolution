import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task.component';

const pagesroutes: Routes = [
  {
    path: 'dashboard',
    component: TasksComponent,
  },
  {
    path: 'dashboard/:id',
    component: TaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesroutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
