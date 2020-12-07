import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model,';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: []
})
export class TaskComponent implements OnInit {

  taskSelected: Task;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activateRouter: ActivatedRoute,
              private taskService: TaskService ) { }

  taskForm: FormGroup;

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ id }) => this.taskGetById(id) );

    this.taskForm = this.fb.group({
      nameTask: ['', Validators.required],
      priority: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });
  }
    taskGetById(id: string) {
    if (id === 'nueva') {
      return;
    }
    this.taskService.taskGetById(id).subscribe((tarea: any) => {  // servicio desde el back para obtener tarea por id

      if (!tarea) {
        return this.router.navigateByUrl(`/dashboard`);
      }
      const {
        nameTask,
        priority,
        expirationDate,
      } = tarea.task;
      this.taskSelected = tarea.task;
      const expD = moment(expirationDate).format('YYYY-MM-DD');
      this.taskForm.setValue({nameTask, priority, expirationDate: expD} ); // Setear Valores a taskForm
    });
  }
  saveData() {
    const nameTask = this.taskForm.get('nameTask').value;
    if (this.taskSelected) {
      const task = { ...this.taskForm.value, tid: this.taskSelected.tid }; // desestructurar el formulario y asiganar valor a tid
      this.taskService.updateTask(task).subscribe((resp: any) => {
        Swal.fire(
          'Actualizada',
          `la tarea ${ nameTask } Actualizo Correctamente`,
          'success'
          );
        this.router.navigateByUrl(`/dashboard`);
    });

  } else {
    this.taskService.createTask(this.taskForm.value).subscribe( (resp: any) => {
      Swal.fire('Exito', resp.msg, 'success');
      this.router.navigateByUrl(`/dashboard/${resp.Task.tid}`);
    });
    }
  }
}
