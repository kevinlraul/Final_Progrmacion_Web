import { Component , OnInit} from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiService } from '../api.service';
import { Users } from '../user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit  {
  userData: any;
  apiKey: string = environment.api_key 
  myToken: any;
  angForm: FormGroup;
  user: any;
  isAdmin: boolean;
  userId: any;
  editProfile: boolean = false;
  esMiPerfil: boolean = false;
  misPeliculas: any;
  editUser = 0;
  roles: any;
  rolId: any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private dataService: ApiService,private router: Router) {
    this.user = this.route.snapshot.paramMap.get('id');
    this.myToken = this.dataService.getToken();
    this.esMiPerfil = this.user == this.myToken;   
    this.angForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', Validators.required],
      name: ['', Validators.required],
      admin: ['', Validators.required],
    });
    
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  

  getListarUsuarios() {     
    // Luego, una vez que tenemos los datos de los usuarios, podemos obtener el perfil del usuario actual
    this.dataService.getPerfil(this.user)
    .subscribe({
      next: (profileResponse) => {
        console.log(profileResponse)
        this.userData = profileResponse[0]; 
        // Establecemos los valores en angForm después de obtener el perfil
        this.angForm.setValue({
          name: profileResponse[0]?.name,
          email: profileResponse[0]?.email,
          password: profileResponse[0]?.password,
          admin:profileResponse[0]?.rol,
        });
      },
      error: (e) => { },
    });    
  }
  


//falta completar  editar perfil 

patchData(angForm1: any, idUser: number) {   
  let idRol =  this.userData?.rol;
  this.dataService
    .getActualizarUsuario(
      idUser,
      angForm1.value.name,
      angForm1.value.email,
      idRol,
      angForm1.value.password
    )    
    .subscribe(() => {
      this.getListarUsuarios();
    }); 
  this.editUser = 0; 
}
getEditarPerfil(id :number) {
  
  this.editUser = id ;  
}

cancelEdit(){ 
  this.editUser = 0;
}

///para tener el listado de peliculas comentadas 
getPeliculasComentadas(){
  this.dataService.getPeliculasComentadas(this.user)
  .subscribe({
    next: (response: any) => { 
      this.misPeliculas = response ;
      console.log(this.misPeliculas)   
    }
  });
}


 
 
redireccionPeliculas(id: string) {
  this.router.navigate([`./detalles_pelicula/${id}`]);
}
// donde buscaremos 

  ngOnInit(): void {
    this.getListarUsuarios();
    this.userId = this.dataService.getToken(); 
    this.getPeliculasComentadas()      
  }
}
