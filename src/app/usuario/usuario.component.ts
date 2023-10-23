import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../user';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  users: Users[] = [];
  selectedUserId: number | null = null; 
  editUser = 0;
  roles: any;
  rolId: any;
  angForm: any;
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      user: ['', Validators.required],
      email: ['',[Validators.required, Validators.minLength(1), Validators.email],],
      password: ['', [Validators.required]],
      rol: ['', Validators.required],
    });
  }

  patchData(angForm1: any, idUser: number) {
    let rol = angForm1.value.rol != '' ? angForm1.value.rol : 1;
    let idRol = this.roles.find((r: any) => r.rol == rol)?.id;
    this.dataService
      .getActualizarUsuario(
        idUser,
        angForm1.value.user,
        angForm1.value.email,
        idRol,
        angForm1.value.password
      )
      .subscribe(() => {
        this.listarUsers();
      });
    this.editUser = 0; 
  }

  listarUsers() {
    this.dataService.getUsuario().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (e) => { },
    });
  }

  delete(id: any) {
    this.dataService.getEliminarUsuario(id).subscribe(() => {
      this.listarUsers();
    });/*
    this.dataService.deleteComentarioUser(id).subscribe(() => { });
    this.dataService.deletePostUser(id).subscribe(() => { });
    this.dataService.removeLikesUser(id).subscribe(() => {
      this.listarUsers();
    });*/
  }

 
  
  editarFormulario(userId: number) {
    this.editUser = userId; // Mostrar el formulario de edición para el usuario seleccionado
  }

  listarRoles() {
    this.dataService.getSeleccionRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (e) => { },
    });
  }

  
  isCurrentUser(id: any) {
    if (this.users.find((r: any) => this.dataService.getToken() == id)) {
      return true;
    }
    return false;
  }
  cancelEdit(){
 
    this.editUser = 0;
  }
  ngOnInit(): void { 
    this.listarUsers();
    this.listarRoles();  
  }
}
