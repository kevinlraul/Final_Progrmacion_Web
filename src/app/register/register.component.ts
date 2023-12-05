import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl,  FormBuilder,  Validators} from '@angular/forms';
import { findIndex, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  users: Users[] = []
  
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', Validators.required],
      name: ['', Validators.required],
      admin: ['', Validators.required],
    });
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
  get name() {
    return this.angForm.get('name');
  }
  get admin() {
    return this.angForm.get('admin');
  }
 
  getUsuario() {
    this.dataService.getUsuario()
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (e) => { }
      });
  }
 

  postdata(angForm1: FormGroup) {// lo que hace es una comparacion de datos para ver si ya esta registrado en la pagina 
    const isAdmin = angForm1.value.admin ? 1 : 2; // este no se si es necesario 
    const isCreated: any = this.users.find((user: Users) => user.name == angForm1.value.name || user.email == angForm1.value.email)
    if (!isCreated) {
      console.log((!isCreated === true))
      this.dataService  
        .postRegistroUsuario(
          angForm1.value.name,
          angForm1.value.email,
          angForm1.value.password,
          isAdmin
        )
        .pipe(first())
        .subscribe(
          (data) => {          
            this.router.navigate(['login']);
          },
          (error) => { }
        );
    } else {
      alert(        
        'Lo sentimos... este usuario/correo electrónico ya existe, por favor intenta con otro'
      );
    }  
  }

  getLogin() {
    this.router.navigate(['login']);
  } 
  
  ngOnInit() {
    this.getUsuario();
  }
}
