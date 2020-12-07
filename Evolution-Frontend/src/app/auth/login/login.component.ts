import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
  }
  login() {
    if (this.loginForm.invalid) {
      return;
     }
    this.userService.login(this.loginForm.value).subscribe(
      (resp: any) => {
          console.log(resp);
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('token', resp.token);

          this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
