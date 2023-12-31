import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {    
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  IngresoApp(angForm1: FormGroup) {
    this.dataService.getuserlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.dataService.registrado();
          console.log(angForm1.value.email)
          console.log(angForm1.value.password)
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/peliculas';
          this.router.navigate([redirect]);
          
        },
        error => {
          console.log(angForm1.value.email)
          console.log(angForm1.value.password)
          alert("usuario o contraseña son incorrectas")
        });        
  }

  register() {
    this.router.navigate(['/register']);
  }

  get email() { 
    return this.angForm.get('email'); 
  }

  get password() {
    return this.angForm.get('password'); 
  }
  
  ngOnInit() {  }  
}
