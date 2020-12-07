import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks/tasks.component';

const pagesroutes: Routes = [
  {
    path: 'dashboard',
    component: TasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesroutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
