import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { LoginForm } from '../interfaces/LoginForm.interface';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }


  login( formdata: LoginForm) {
    return this.http.post(`${base_url}/login`, formdata);
  }

  createUser(formData: RegisterForm) {

    const { email, password, fullname } = formData;
    const url = `${base_url}/user`;
    return this.http.post(url, { email, password, fullname } );
  }

}
