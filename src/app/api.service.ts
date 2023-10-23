import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from './environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  
redirectUrl: string = '';
apiKey :string = environment.api_key
baseUrl: string = environment.baseUrl;
headers :any 
userRol: any;
token = "muDwxWkIp-Ul"

@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
@Output() getLoggedInAdmin: EventEmitter<any> = new EventEmitter();
constructor(private httpClient: HttpClient , private jwtHelper: JwtHelperService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWY5OWYyZTlkMDE3OTg5MzkwNTFlZmU0NjhlYjg0OSIsInN1YiI6IjY1MDc3Mjg2NDJkOGE1MDBhYmI0Mzk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9cbTlv00rEsjlqP1ztI88aes44ctXeWcTs4WkAO_54g' 
    });
 }

 public getuserlogin(username: string, password: string) {
  return new Observable<any>((observer) => {
    this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .subscribe(
        (Users) => {
          const decodedToken = this.jwtHelper.decodeToken(Users.token);// el decode jwtHelper 
          this.setToken(decodedToken[0].id);// guardo el token    
          this.setRol((decodedToken[0].rol));// guado el rol 
          this.userRol = decodedToken[0].rol;//
          this.getLoggedInName.emit(true);
          if (decodedToken[0].rol == 1) {
            this.getLoggedInAdmin.emit(true);
          } else {
            this.getLoggedInAdmin.emit(false);
          }
          observer.next(Users[0]); 
          observer.complete();
          
        },
        (error) => {
          observer.error(error);
          console.log(error)
        }
      );
  });
}

 


 
 public getPeliculas(numero: number) { 
    return this.httpClient.get<any>(          
         `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${numero}`,{headers:this.headers}         
      )
      .pipe(
        map((peliculas) => {  
          return peliculas;
        })
      );
  }

  public getDetallesPeliculas(id: string) {
    return this.httpClient
      .get<any>(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,{headers:this.headers})
      .pipe(
        map((detalle) => {  
          return detalle;
        })
      );
  }

  public getTrailerPeliculas(id: string) {
    return this.httpClient
      .get<any>(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,{headers:this.headers})
      .pipe(
        map((trailer) => {

          return trailer;
        })
      );
  }

  public getComentarios() {
    return this.httpClient
      .get<any>(this.baseUrl + '/seleccion_comentarios.php')
      .pipe(
        map((comentarios) => {
          return comentarios;
        })
      );
  }

  getRespuestaComentarios(){
    return this.httpClient
      .get<any>(this.baseUrl + '/seleccion_respuesta_comentarios.php')
      .pipe(
        map((respuesta) => {
          console.log(respuesta)
          return respuesta;
        })
      );
  }
  getPeliculasComentadas(user_id: number){
    return this.httpClient
      .post<any>(this.baseUrl + '/seleccion_peliculas_comentadas.php', {user_id} )
      .pipe(
        map((comentarios) => {
          return comentarios;
        })
      );
  }


  getMegusta(pelicula_id: number ,user_id: number ,like: boolean){
    return this.httpClient
      .post<any>(this.baseUrl + '/like_prueba.php', {pelicula_id,user_id,like} )
      .pipe(
        map((comentarios) => {
          return comentarios;
        })
      );
  }

  getImagen(){
    return this.httpClient.get<any>(this.baseUrl + '/seleccion_imagen.php').pipe(
      map((imagen) => {
        return imagen;
      })
    );
  }

  public getAgregarImagen(usario_id: number, imagen: string ,texto: string ) {
    const user = this.getToken();
    return this.httpClient
      .post<any>(this.baseUrl + '/prueba_imagen.php', {usario_id,texto,imagen})
      .pipe(
        map((imagen) => {
          return imagen;
        })
      );
  }

  public getAgregarComentario(usuario: number, texto: string,pelicula_id:string ,imagen: string ,titulo: string) {
    const user = this.getToken();
    return this.httpClient
      .post<any>(this.baseUrl + '/comentarios.php', { usuario,texto,pelicula_id,imagen,titulo})
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }
  public getAgregarRespuesta(nrocomentario: number, usuario:number ,usercomentado:number,texto: string){
    const user = this.getToken();
    return this.httpClient
      .post<any>(this.baseUrl + '/respuesta_comentarios.php', {nrocomentario,usuario, usercomentado,texto})
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }
  

  public getUsuario() {
    return this.httpClient.get<any>(this.baseUrl + '/seleccion_usuario.php').pipe(
      map((Users) => {
        return Users;
      })
    );
  }

  public getRegistroUsuario(name: string,email: string,pwd: string,admin: number) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const nombre   = name ; 
    const img =
      'https://api.dicebear.com/7.x/initials/svg?seed=' +
      //name.substring(0, 2) +     // a teneido muchos cambios como se consigue el avatar por la api a si que falla es por eso ya me paso varias veces jajaja 
      // Capitalizamos la primera letra del nombre
      nombre.toUpperCase().substring(0, 2)   +
      '.svg';
      alert(        
        'antes del return '
      )
    return this.httpClient
      .post<any>(this.baseUrl + '/registro.php', {
        name,
        email,
        pwd,
        admin,
        img,
      })
      .pipe(       
        map((Users) => {
          alert(        
            'registro de usuario'
          )
          return Users;
        })
      );
    }
 


    public getPerfil(id: any) {
      return this.httpClient.post<any>(this.baseUrl + '/seleccion_perfil.php', {id})
        .pipe(
          map((perfile) => {
            return perfile;
          })
        );
    } 
  
    public getChat(sender: number, receiver: number) {
      return this.httpClient
        .post<any>(this.baseUrl + '/seleccion_chat.php', { sender, receiver })
        .pipe(
          map((chat) => {
            return chat;
          })
        );
    }

    public getAgregarMensaje(sender: number, receiver: number, message: string) {
      console.log(sender, receiver, message);
      return this.httpClient
        .post<any>(this.baseUrl + '/chat.php', { sender, receiver, message })
        .pipe(
          map((chat) => {
            return chat;
          })
        );
    }
  
    public getUsuarios() {
      return this.httpClient.get<any>(this.baseUrl + '/seleccion_usuario.php').pipe(
        map((Users) => {
          return Users;
        })
      );
    }

  /* propiedades de los usuarios 
updateUser

  */
  public getActualizarUsuario(
    id: number,
    name: string,
    email: string,
    rol: number = 1,
    password: string
  ) {
    return this.httpClient.post(`${this.baseUrl}/actualizar_usuario.php`, {
      id,
      name,
      email,
      rol,
      password,
    });
  }




  public getEliminarUsuario(id: number) {
    return this.httpClient
      .post<any>(this.baseUrl + '/eliminar_usuario.php', { id })
      .pipe(
        map((User) => {
          return User;
        })
      );
  }

  public getSeleccionRoles() {
    return this.httpClient.get<any>(this.baseUrl + '/seleccion_roles.php').pipe(
      map((roles) => {
        return roles;
      })
    );
  }

   //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRol(token: string) {
    localStorage.setItem('rol', token);
  }
  public getToken() {
    return localStorage.getItem('token');
  }
  getRol() {
    return localStorage.getItem('rol');
  }
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  registrado() {
    const usertoken = this.getToken();   
    if (usertoken != null) { 
      return true;
    }
    return false;
  }

}