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
  id: any; 
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
  
  constructor(private dataService: ApiService, private route: ActivatedRoute ,private router: Router,private fb: FormBuilder ) {   
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    } 
  }
  getDetallesPeliculas() {
    this.dataService.getDetallesPeliculas(this.id).subscribe({
      next: (response: any) => {       
        this.detalles = response; 
        this.detalles.poster_path =this.BaseImageURL  + this.detalles.poster_path;
 
      }, 
      error: (e) => { },
    });     
  }

  getTrailerPeliculas( ) {
    this.dataService.getTrailerPeliculas(this.id).subscribe({
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


  getComentario(e: any){ // accionado por el boton de enviar 
    this.enviarComentario = e.target.value // lo que contiene es el comentario 
  }
  
  getlistarComentarios(){
    this.dataService.getComentarios().subscribe({
      next: (response) => {
        this.comentarios= response;
        this.getListarRespuestaComentarios()
        console.log(this.comentarios)
      },
      error: (e) => { },
    });
  }
  // id / comentario_id / user_id / texto / nombre / avatar/fecha_hora
  getAgregarComentario(){  
    this.dataService.getAgregarComentario(this.userId,this.enviarComentario,this.id,this.detalles.poster_path ,this.detalles.original_title)
    .subscribe(( ) => {   
      this. getlistarComentarios();     
      this.enviarComentario= '' ;       
    });
  }

  getAgregarRespuesta(comentado : number){ 
    if (this.respuesta== true) {
      this.dataService.getAgregarRespuesta(this.comentario_id,this.userId,comentado,this.enviarComentario)
      .subscribe(( ) => {     
        this.getListarRespuestaComentarios();   
        this.enviarComentario= '' ;  
        this.respuesta= false ; 
      });
    }    
  }

  getAgregarRespuestaRespuesta(id  : number , coment_id:number ){
    console.log(this.comentario_id)
    if (this.respuesta== true) {
      this.dataService.getAgregarRespuesta(coment_id,this.userId,id,this.enviarComentario)
      .subscribe(( ) => {     
        this.getListarRespuestaComentarios();   
        this.enviarComentario= '' ;  
        this.respuesta= false ; 
      });
      this.enviarComentario= '' ;  
      this.respuesta= false ; 
    } 

  }
  getListarRespuestaComentarios(){
    this.dataService.getRespuestaComentarios().subscribe({
      next: (response) => {
        this.respuesta_comentario= response;
        console.log(this.respuesta_comentario)
      },
      error: (e) => { },
    });
  }

  getCancelarRespuesta(){
    this.respuesta= false ; 
 
  }

  obteniendo_id(id :any){ 
    this.comentario_id =id ;
    this.respuesta_id = 0 ;
    this.respuesta = true ;  
  }
  obtendido_respuesta_id(id :any){
    this.respuesta_id  = id ;
    this.comentario_id = 0 ;
    console.log(this.respuesta_id)
    this.respuesta = true ;  
  }
 
  getMegusta(){
    this.dataService.getMegusta(this.id,this.userId,true) 
    .subscribe(( ) => {    

    });
  }

  ngOnInit(): void { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.userId = this.dataService.getToken();   
    this.getDetallesPeliculas()
    this.getTrailerPeliculas()  
    this.getlistarComentarios() 
 
  }
}
