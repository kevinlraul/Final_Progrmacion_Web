import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  pelicula : any;
  detalles: any  ; 
  trailer : any = [] ;
  BaseyoutubeURL: string = `https://www.youtube.com/watch?v=` ;
  BaseImageURL: any  = `https://image.tmdb.org/t/p/w500`;
  enviarComentario: any;
 ; 
  
  constructor(private dataService: ApiService, private route: ActivatedRoute ,private router: Router ) { }

  getDetallesPeliculas() {
    this.dataService.getDetallesPeliculas(this.id).subscribe({
      next: (response: any) => {       
        this.detalles = response; 
        this.detalles.poster_path =this.BaseImageURL  + this.detalles.poster_path;
        console.log(this.detalles) 
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
        })); console.log(this.trailer)
      },
      error: (e) => { },
    });
  }
 
  getComentario(e: any){
    this.enviarComentario = e.target.value
  }

  getAgregarComentario() {    
      
  }

  
 
 
  ngOnInit(): void { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetallesPeliculas()
    this.getTrailerPeliculas()  
  }
}
