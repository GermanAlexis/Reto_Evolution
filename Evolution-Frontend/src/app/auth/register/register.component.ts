import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    fullname:  ['alex', [Validators.required, Validators.minLength(3)] ],
    email:     ['alexalva@correo.com', [Validators.required, Validators.email]],
    password:  ['123', Validators.required],
    password2: ['123', Validators.required],
  }, {validators: this.passwordEqual('password', 'password2')});

  constructor(  private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {

    this.formSubmitted = true;
    if (this.registerForm.invalid ) {
      return;
    }
    this.userService.createUser(this.registerForm.value).subscribe( (resp) => {
      Swal.fire('Exitos', 'Usuario Registrado', 'success');
      this.router.navigateByUrl('/dashboard');
      console.log(resp);
     }, (err) => Swal.fire('Error', err.error.msg, 'error'));
  }

  campoValid( campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenaNoValid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;


    if ( (pass1 !== pass2) && this.formSubmitted) {
        return true;
    } else {
      return false;
    }
  }
  passwordEqual(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const passcontrol1 = formGroup.get(pass1);
      const passcontrol2 = formGroup.get(pass2);

      if (passcontrol1.value === passcontrol2.value) {
        passcontrol2.setErrors(null);
      } else {
        passcontrol2.setErrors( {noEsIgual: true});
      }

    };
  }

}
