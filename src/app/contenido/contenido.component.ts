import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit{
  url: string = '../../images/foto.jpg';
  imagen:any=null;
  ImagenCargada:boolean = false ;
  enviarComentario: any='';
  userId : any;   
  contenido: any ; 
  constructor(private dataService: ApiService, ) {  }
  SubidaImagen(event:any)
  {
    var reader = new FileReader();
    reader.onload = (event:any) => 
    {
      console.log( event.target.result)
        this.imagen = event.target.result;    
    }     
    reader.readAsDataURL( event.target.files[0] );  
    this.confirmarimagen()
  }

  confirmarimagen()
  {
    this.ImagenCargada = true;
  }
  GuardarImagen(){
   // if (this.enviarComentario != ""){
      this.dataService.getAgregarImagen(this.userId,this.imagen,this.enviarComentario)
      .subscribe(( ) => {  
        this.enviarComentario= '' ;   
        this.imagen=null;  
        this.imagenes_cargadas()      
      });    
    //}
    //else {
    //  alert("el texto esta vacio")
    //}
  }
  descartarImagen(){
    this.imagen=null;    
  }

  imagenes_cargadas(){
    this.dataService.getImagen().subscribe({
      next: (response) => {
        this.contenido= response;
        console.log(this.contenido)
      },
      error: (e) => { },
    });
  }

  getComentario(e: any){ // accionado por el boton de enviar 
    this.enviarComentario = e.target.value // lo que contiene es el comentario 
  }

 ngOnInit(): void { 
  this.userId = this.dataService.getToken();   
  this.imagenes_cargadas()
 }
}
