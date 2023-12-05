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

//@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
//@Output() getLoggedInAdmin: EventEmitter<any> = new EventEmitter();
constructor(private httpClient: HttpClient , private jwtHelper: JwtHelperService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWY5OWYyZTlkMDE3OTg5MzkwNTFlZmU0NjhlYjg0OSIsInN1YiI6IjY1MDc3Mjg2NDJkOGE1MDBhYmI0Mzk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9cbTlv00rEsjlqP1ztI88aes44ctXeWcTs4WkAO_54g' 
    });
 }
  
public getuserlogin(username: string, password: string) {  
  const login = `${this.baseUrl}/login.php?username=${username}&password=${password}`; 
  return new Observable<any>((observer) => {
    this.httpClient.get<any>(login)
      .subscribe(
        (Users) => { 
          console.log(Users)
          console.log(Users.token)
          if (Users && Users.token) { 
            const decodedToken = this.jwtHelper.decodeToken(Users.token); 
            this.setToken(decodedToken[0].id);// id de usario 
            this.setRol(decodedToken[0].rol);// rol que tiene el usuario 
            this.userRol = decodedToken[0].rol;
            
            
            observer.next(Users[0]);
            observer.complete();
          } else {
            console.error("El objeto Users o Users.token es nulo o indefinido.");
            observer.error("Error: objeto Users o Users.token nulo o indefinido.");
          }
        },
        (error) => {
          observer.error(error);
          console.log(error);
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
        return respuesta;
      })
    );
}
 

getListarLikeRespuestaComentarios(like_pelicula_id: number, like_user_id: number) {
  // Construye la URL con los parámetros
  const url = `${this.baseUrl}/seleccion_comentario_like.php?like_pelicula_id=${like_pelicula_id}&like_user_id=${like_user_id}`;
  
  return this.httpClient
    .get<any>(url)
    .pipe(
      map((respuesta_like) => { 
        return respuesta_like;
      })
    );
}

 
 
getPeliculasComentadas(user_id: number) {
  const url = `${this.baseUrl}/seleccion_peliculas_comentadas.php?user_id=${user_id}`;

  return this.httpClient
    .get<any>(url)
    .pipe(
      map((comentarios) => {
        return comentarios;
      })
    );
}

  
getMegusta(pelicula_id: number, user_id: number) {
  const url = `${this.baseUrl}/like.php?pelicula_id=${pelicula_id}&user_id=${user_id}`; 
  return this.httpClient
    .get<any>(url)
    .pipe(
      map((gusta) => {
        return gusta;
      })
    );
}


getEstadoLike(pelicula_id: number, user_id: number) {
  const url = `${this.baseUrl}/estado_like.php?pelicula_id=${pelicula_id}&user_id=${user_id}`;

  return this.httpClient
    .get<any>(url)
    .pipe(
      map((estado) => {
        return estado;
      })
    );
}

getEstadoDisLike(pelicula_id: number, user_id: number) {
  const url = `${this.baseUrl}/estado_dislike.php?pelicula_id=${pelicula_id}&user_id=${user_id}`;

  return this.httpClient
    .get<any>(url)
    .pipe(
      map((estado) => {
        return estado;
      })
    );
}
 
  postAgregarMeGusta(pelicula_id: number, user_id: number ,like : string,dislike : string ){
    return this.httpClient
    .post<any>(this.baseUrl + '/seleccion_like.php', {pelicula_id,user_id,like,dislike})
    .pipe(
      map((me_gusta) => {
        return me_gusta;
      })
    );
  }
  postAgregarMeGustaComentario(pelicula_id:number,comentario_id: number, user_id: number ,like : string,dislike : string ){
    return this.httpClient
    .post<any>(this.baseUrl + '/seleccion_like_comentario.php', {pelicula_id,comentario_id,user_id,like,dislike})
    .pipe(
      map((me_gusta) => {
        return me_gusta;
      })
    );
  }

  patchEstadoLike(pelicula_id: number, user_id: number ,like : string,dislike : string ){
    return this.httpClient
    .patch<any>(this.baseUrl + '/actualizar_like_dislike.php',{pelicula_id,user_id,like,dislike})
    .pipe(
      map((estado) => {
        return estado;
      })
    );
  }
  patchEstadoLikeComentado(comentario_id:number,pelicula_id: number, user_id: number ,like : string,dislike : string ){
    return this.httpClient
    .patch<any>(this.baseUrl + '/actualizar_like_dislike_comentario.php',{comentario_id,pelicula_id,user_id,like,dislike})
    .pipe(
      map((estado) => {
        return estado;
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

  public postAgregarImagen(usario_id: number, imagen: string ,texto: string ) {
    const user = this.getToken();
    return this.httpClient
      .post<any>(this.baseUrl + '/prueba_imagen.php', {usario_id,texto,imagen})
      .pipe(
        map((imagen) => {
          return imagen;
        })
      );
  }

  public patchComentario(nrocomentario: number,texto: string){
    return this.httpClient
    .patch<any>(this.baseUrl + '/actualizar_comentarios.php', { nrocomentario,texto})
    .pipe(
      map((Users) => {
        return Users;
      })
    );
  }
   
  public pachRespuestaComentario(nrocomentario: number,texto: string){
    return this.httpClient
    .patch<any>(this.baseUrl + '/actualizar_respuesta_comentarios.php', { nrocomentario,texto})
    .pipe(
      map((Users) => {
        return Users;
      })
    );
  }

  public postAgregarComentario(usuario: number, texto: string,pelicula_id:string ,imagen: string ,titulo: string) { 
    return this.httpClient
      .post<any>(this.baseUrl + '/comentarios.php', { usuario,texto,pelicula_id,imagen,titulo})
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }

  public postAgregarRespuesta(nrocomentario: number, usuario:number ,usercomentado:number,texto: string){ 
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

  public postRegistroUsuario(name: string,email: string,pwd: string,admin: number) {
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
 

    
    public  getContarLike(pelicula_id: number ) {
      const url = `${this.baseUrl}/contar_like.php?pelicula_id=${pelicula_id}`;
    
      return this.httpClient
        .get<any>(url)
        .pipe(
          map((chat) => {
            return chat;
          })
        );
    }

    public getContarDislike(pelicula_id: number, ) {
      const url = `${this.baseUrl}/contar_dislike.php?pelicula_id=${pelicula_id}`; 
      return this.httpClient
        .get<any>(url)
        .pipe(
          map((chat) => {
            return chat;
          })
        );
    }

 
    public getPerfil(id: any) {   
      const url = `${this.baseUrl}/seleccion_perfil.php?id=${id}`;
    
      return this.httpClient
        .get<any>(url)
        .pipe(
          map((perfil) => {
            return perfil;
          })
        );
    }
    
 

    public Chat(sender: number, receiver: number) {
      const url = `${this.baseUrl}/seleccion_chat.php?sender=${sender}&receiver=${receiver}`;
    
      return this.httpClient
        .get<any>(url)
        .pipe(
          map((chat) => {
            return chat;
          })
        );
    }
    

    public postAgregarMensaje(sender: number, receiver: number, message: string) { 
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

 
  public getActualizarUsuario(
    id: number,
    name: string,
    email: string,
    rol: number = 1,
    password: string
  ) {
    return this.httpClient.patch<any>(this.baseUrl + `/actualizar_usuario.php`, {
      id,
      name,
      email,
      rol,
      password,
    });
  }
  
 

  
  public EliminarUsuario(id: number) {
    const url = `${this.baseUrl}/eliminar_usuario.php?id=${id}`;  
    return this.httpClient
      .delete<any>(url)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  
  public EliminarImagen(id : number){
    const url = `${this.baseUrl}/eliminar_imagen.php?id=${id}`;  
    return this.httpClient.delete<any>(url) 
  }
  public EliminaComentario(id: number) {
    const url = `${this.baseUrl}/eliminar_comentario.php?id=${id}`;  
    return this.httpClient.delete<any>(url) 
  }

  public EliminarRespuesta(id: number) {
    const url = `${this.baseUrl}/eliminar_respuesta_comentario.php?id=${id}`;  
    return this.httpClient.delete<any>(url) 
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