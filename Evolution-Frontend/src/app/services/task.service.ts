import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model,';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  createTask(task: Task) {

    const url = `${base_url}/task`;
    return this.http.post( url, task, this.headers);

  }
  getTask() {
    const url = `${base_url}/task`;
    return this.http.get( url, this.headers);
  }
  priorityTask(task: Task) {
    const url = `${base_url}/task/${task.tid}`;
    return this.http.put( url, task.priority, this.headers);

  }
  updateTask(task: Task) {
    const url = `${base_url}/task/${task.tid}`;
    return this.http.put( url, task, this.headers);

  }
  deleteTask(task: Task) {
    const url = `${base_url}/task/${task.tid}`;
    return this.http.delete( url, this.headers);
  }

  taskGetById(id: string) {
    const url = `${base_url}/task/${id}`;
    return this.http.get( url, this.headers);
  }
}
