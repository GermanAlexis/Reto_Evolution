import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/RegisterForm.interface';
import { LoginForm } from '../interfaces/LoginForm.interface';
import { EmailValidator } from '@angular/forms';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  login( formdata: LoginForm) {
    return this.http.post(`${base_url}/login`, formdata, this.headers );
  }

  createUser(formData: RegisterForm) {

    const { email, password, fullname } = formData;
    const url = `${base_url}/user`;
    return this.http.post(url, { email, password, fullname } );
  }

}
