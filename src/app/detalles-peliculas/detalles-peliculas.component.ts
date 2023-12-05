import { Component , OnInit } from '@angular/core';
import { FormBuilder,  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ApiService } from '../api.service';
 
 @Component({
  selector: 'app-detalles-peliculas',
  templateUrl: './detalles-peliculas.component.html',
  styleUrls: ['./detalles-peliculas.component.css']
})
export class DetallesPeliculasComponent implements OnInit  {
  pelicula_id: any; 
  detalles: any  ; 
  userId:any ; 
  enviarComentario: any='';
  comentarios: any;
  trailer : any = [];  
  isAdmin: boolean;
  respuesta : boolean = false ; 
  BaseyoutubeURL: string = `https://www.youtube.com/watch?v=` ;
  BaseImageURL: any  = `https://image.tmdb.org/t/p/w500`;
  comentario_id : any ; 
  respuesta_id : any; 
  respuesta_comentario:any; 
  contenido_like:any;
  estado_like: any;
  estado_dislike:any; 
  estado_comentario:any;
  like_respuesta_comentario:any;
  estado_respuesta:any;  
  edit:boolean = false ; 
  cont_like : number = 0 ;
  cont_dislike : number = 0 ;   
  constructor(private dataService: ApiService, private route: ActivatedRoute ,private router: Router,private fb: FormBuilder ) {   
    let rol = Number(this.dataService.getRol());
 
    if (rol == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    } 
    
  }
  getDetallesPeliculas() {
    this.dataService.getDetallesPeliculas(this.pelicula_id).subscribe({
      next: (response: any) => {       
        this.detalles = response; 
        this.detalles.poster_path =this.BaseImageURL  + this.detalles.poster_path;
 
      }, 
      error: (e) => { },
    });     
  }

  getTrailerPeliculas( ) {
    this.dataService.getTrailerPeliculas(this.pelicula_id).subscribe({
      next: (response: any) => {      
        this.trailer = response.results;  
        this.trailer =this.trailer.map((corto :any) =>({
          ...corto , 
          Trailer: this.BaseyoutubeURL + corto.key
        })); 
      },
      error: (e) => { },
    });
  }




  getListarRespuestaComentarios(){
    this.dataService.getRespuestaComentarios().subscribe({
      next: (response) => {
        this.respuesta_comentario= response;  
      },
      error: (e) => { },
    });
  }
 
  getListarLikeRespuestaComentarios(){
    this.dataService.getListarLikeRespuestaComentarios(this.pelicula_id,this.userId).subscribe({
      next: (response) => {        
        this.like_respuesta_comentario=response ;

        this.like_respuesta_comentario = this.like_respuesta_comentario
        .filter((corto : any) => corto.name != null && corto.avatar != null)  
      },
      error: (e) => { },
    });
  }


  


  EliminarRespuesta(id :number){
    this.dataService.EliminarRespuesta(id).subscribe(() => {
      this.getlistarComentarios(); 
    });
  }
  EliminarComentario(id :number){
    this.dataService.EliminaComentario(id).subscribe(() => {
      this.getlistarComentarios() ;
    });
  }

  getAgregarRespuestaRespuesta(id  : number , coment_id:number ){ 
    if (this.respuesta== true) {
      this.dataService.postAgregarRespuesta(coment_id,this.userId,id,this.enviarComentario)
      .subscribe(( ) => {     
        this.getListarRespuestaComentarios();   
        this.enviarComentario= '' ;  
        this.respuesta= false ; 
       
      });
      this.enviarComentario= '' ;  
      this.respuesta= false ; 
    } 

  }
    // id / comentario_id / user_id / texto / nombre / avatar/fecha_hora
    AgregarComentario(){  
      this.dataService.postAgregarComentario(this.userId,this.enviarComentario,this.pelicula_id,this.detalles.poster_path ,this.detalles.original_title)
      .subscribe(( ) => {   
        this.getlistarComentarios();     
        this.enviarComentario= '' ;       
      });
    }

  getComentario(e: any){ // accionado por el boton de enviar 
    this.enviarComentario = e.target.value // lo que contiene es el comentario 
  }

  getlistarComentarios(){
    this.dataService.getComentarios().subscribe({
      next: (response) => {
        this.comentarios= response;
        this.getListarRespuestaComentarios()
 
      },
      error: (e) => { },
    });
  }
  getCancelarRespuesta(){
    this.respuesta= false ;  
  }
  postAgregarRespuesta(comentado : number){ 
    if (this.respuesta== true) {
      this.dataService.postAgregarRespuesta(this.comentario_id,this.userId,comentado,this.enviarComentario)
      .subscribe(( ) => {     
        this.getListarRespuestaComentarios();   
        this.enviarComentario= '' ;  
        this.respuesta= false ; 
      });
    }    
  }
  obteniendo_id(id :any){ 
    this.comentario_id =id ;
    this.respuesta_id = 0 ;
    this.respuesta = true ;  
  }
  editar_comentario(id:any , comentario: string){// prueba 
    this.comentario_id =id ; 
    this.respuesta_id = 0 ; 
    this.enviarComentario = comentario
    this.respuesta = true ;  
    this.edit = true ;
  }
  actualizarComentario( ){
    if (this.respuesta== true) { 
    this.dataService.patchComentario(this.comentario_id,this.enviarComentario)
    .subscribe(( ) => {     
      this.getlistarComentarios();   
      this.enviarComentario= '' ; 
      this.respuesta = false ;    
      this.edit=false;
      });
    }
  }

  obtendido_respuesta_id(id :any){
    this.respuesta_id  = id ;
    this.comentario_id = 0 ; 
    this.respuesta = true ;  
  }

  editar_respuesta(id : any ,comentario:string){// prueba 
    this.respuesta_id  = id ;
    this.comentario_id = 0 ; 
    this.respuesta = true ; 
    this.enviarComentario = comentario;
    this.edit = true ;
  }

  actualizarrespuestacomentario(){
    if (this.respuesta== true) { 
      this.dataService.pachRespuestaComentario(this.respuesta_id,this.enviarComentario)
      .subscribe(( ) => {     
        this.getListarRespuestaComentarios()
        this.enviarComentario= '' ; 
        this.respuesta = false ;    
        this.edit=false;
        });
      }
  }

  
  actualizar(like: string ,dislike:string){    
    if(this.contenido_like == 0 ){     
        this.dataService.postAgregarMeGusta(this.pelicula_id,this.userId,like,dislike)        
        .subscribe(( ) => {
          this.cantlike()      
          this.actualizar_like(like,dislike)      
      });
    }else { 
        this.actualizar_like(like,dislike) 
    }
    this.getMeGusta()
  }
 
  actualizar_like(like: string ,dislike:string){
    this.dataService.patchEstadoLike(this.pelicula_id,this.userId,like,dislike)
    .subscribe({
      next: (response) => {     
         this.get_estado_like()
         this.get_estado_dislike()
         this.contar_megusta()
         this.contar_nomegusta()
      },
      error: (e) => { },
    });
  }
 
  actualizar_like_comentado(id_comentado:number,like: string,dislike:string){
    this.dataService.patchEstadoLikeComentado(id_comentado,this.pelicula_id,this.userId,like,dislike)
    .subscribe({
      next: (response) => {   
        this.getlistarComentarios()
      },
      error: (e) => { },
    });
  }
  
  cantlike(){
    this.dataService.getMegusta(this.pelicula_id,this.userId)
    .subscribe({
      next: (response) => {
        this.contenido_like= response[0].result;  
      },
      error: (e) => { },
    });
  }
  get_estado_dislike(){
    this.dataService.getEstadoDisLike(this.pelicula_id,this.userId)
    .subscribe({
      next: (response) => {
        this.estado_dislike= response[0].no_megusta;  
        console.log(this.estado_dislike)
      },
      error: (e) => { },
    });
  }
  get_estado_like(){
    this.dataService.getEstadoLike(this.pelicula_id,this.userId)
    .subscribe({
      next: (response) => {

        if (response[0] !== null && response[0] !== undefined) {
          this.estado_like = response[0].me_gusta; 
          console.log(this.estado_like)
        }    
        else {
          this.estado_like = null
        } 
      },
      error: (e) => { },
    });
  } 
  
  getMeGusta(){
    this.respuesta_comentario 
  }

 
  /// analizando si necesito o no 
  actualizarcomentado(like: string,dislike:string,id_comentado:number){ 
    this.dataService.postAgregarMeGustaComentario(id_comentado,this.pelicula_id,this.userId,like,dislike)
    .subscribe({
      next: (response) => {     
        this.actualizar_like_comentado(id_comentado,like,dislike)
        this.getlistarComentarios() 
      },
      error: (e) => { },
    });
  }



  contar_megusta(){
    this.dataService.getContarLike(this.pelicula_id )
    .subscribe({
      next: (response) => {
        this.cont_like = response.total_like 
      },
      error: (e) => { },
    });
  }

  contar_nomegusta(){
    this.dataService.getContarDislike(this.pelicula_id)
    .subscribe({
      next: (response) => { 
        this.cont_dislike = response.total_dislike 
      },
      error: (e) => { },
    });
  }
  

  ngOnInit(): void { 
    this.pelicula_id = this.route.snapshot.paramMap.get('id');
    this.userId = this.dataService.getToken();   
    this.getDetallesPeliculas()
    this.getTrailerPeliculas()  
    this.getlistarComentarios() 
    this.cantlike()
    this.get_estado_like()
    this.get_estado_dislike() 
    //this.getListarLikeRespuestaComentarios()
    this.contar_megusta()
    this.contar_nomegusta()
  }
}
