import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { environment } from '../environments/environment';
import  {AppComponent} from '../app.component'
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit { 
  peliculas: any = [];
  apiKey: string = environment.api_key 
  numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  numeroSeleccionado: number | null = null;
  BaseImageURL: any  = `https://image.tmdb.org/t/p/w500`;

  constructor(private dataService: ApiService, private router: Router , private app : AppComponent)  { }

  // Método para cambiar el número seleccionado
  seleccionarNumero(numero: number) {
    this.numeroSeleccionado = numero;
    this.getPeliculas(numero) 
  }

   getPeliculas(numero : number) {
    this.dataService.getPeliculas(numero).subscribe({
      next: (response: any) => {      
        this.peliculas = response.results;  
        this.peliculas =this.peliculas.map((pelicula :any) =>({
          ...pelicula , 
          postercompleto: this.BaseImageURL + pelicula.poster_path
        })); console.log(this.peliculas)
      },
      error: (e) => { },
    });
  }

  redireccionPeliculas(id: string) {
    this.router.navigate([`./detalles_pelicula/${id}`]);
  }

    ngOnInit(): void {  
    this.getPeliculas(1)   
    setTimeout(() => {
      this.app.pipa()
    }, 100);;  
  }
}
