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
  isadmin:any; 
  es_admin: boolean= false ; 
  constructor(private dataService: ApiService, ) {  }
 
  SubidaImagen(event: any) {
    var reader = new FileReader();
    const file = event.target.files[0];
  
    if (file) {
      // Verificar si el tamaño del archivo no excede 550 KB
      if (file.size <= 550 * 1024) {
        reader.onload = (event: any) => {
          this.imagen = event.target.result;
          console.log(this.imagen);
          this.confirmarimagen();
        };
  
        reader.readAsDataURL(file);
      } else {
        // El archivo es demasiado grande, puedes mostrar un mensaje de error o realizar una acción apropiada
        alert('El archivo es demasiado grande. Debe ser menor o igual a 550 KB.');
        this.descartarImagen()
      }
    }
  }

  confirmarimagen()
  {
    this.ImagenCargada = true;
  }
  GuardarImagen(){
   // if (this.enviarComentario != ""){
      this.dataService.postAgregarImagen(this.userId,this.imagen,this.enviarComentario)
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
  admin(){
    this.isadmin= this.dataService.getRol() 
    if( this.isadmin == '1' ){    
      this.es_admin = true 
    }
    else {
      this.es_admin = false 
    }   
  }
  getComentario(e: any){ // accionado por el boton de enviar 
    this.enviarComentario = e.target.value // lo que contiene es el comentario 
  }

  EliminarImagen(id:number){    
    this.dataService.EliminarImagen(id).subscribe(() => {  
      this.imagenes_cargadas();
      console.log(id ) ;
    });    
  }

 ngOnInit(): void { 
  this.admin()    
  this.userId = this.dataService.getToken();   
  this.imagenes_cargadas()
 }
}
