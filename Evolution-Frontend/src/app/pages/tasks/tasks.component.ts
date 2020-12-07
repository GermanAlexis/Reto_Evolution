import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model,';
import { TaskService } from '../../services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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

  }

