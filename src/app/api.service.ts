import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
apiKey :string = environment.api_key
headers :any 
constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWY5OWYyZTlkMDE3OTg5MzkwNTFlZmU0NjhlYjg0OSIsInN1YiI6IjY1MDc3Mjg2NDJkOGE1MDBhYmI0Mzk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9cbTlv00rEsjlqP1ztI88aes44ctXeWcTs4WkAO_54g' 
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
}