import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model,';
import { TaskService } from '../../services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor( private taskService: TaskService,   ) { }
  ngOnInit(): void {
    this.loadTasks();
  }

  alertDay(date: string) {
    if ( this.expiration(date) > 0 ) {
         return `bg-dark`;
    }
    if ( this.expiration(date) < -5  ) {
          return `bg-info`;
    }
    if ( this.expiration(date) > -5 &&  this.expiration(date) < -1  ) {
      return `bg-warning`;
}
    if ( this.expiration(date) === 0) {
      return `bg-danger`;
}
  }

  loadTasks() {
    this.taskService.getTask().subscribe( (resp: any) => {
      this.tasks = resp.tasks;
    });
  }

  changePriority(task: Task) {
    this.taskService.updateTask(task).subscribe( (resp: any) => { Swal.fire('Exito', resp.msg, 'success'); } );
  }


  deleteTask(task: Task) {
      Swal.fire({
        title: 'Estas Seguro?',
        text: `Esta por eliminar la tarea ${task.nameTask}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Desea Eliminarlo!',
      }).then((result) => {
        if (result.value) {
          this.taskService.deleteTask(task).subscribe((resp) => {
            this.loadTasks();
            Swal.fire(
              'Eliminado',
              `${ task.nameTask } has sido eliminado`,
              'success'
            );
          });
        }
      });
  }

  expiration(date: any) {
      const dateofvisit = moment(date, 'YYYY-MM-DD');
      return moment().diff(dateofvisit, 'days');
  }
  }

