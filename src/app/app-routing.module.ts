import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { DetallesPeliculasComponent} from './detalles-peliculas/detalles-peliculas.component';
const routes: Routes = [
    { path: '', component: PeliculasComponent },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'detalles_pelicula/:id', component: DetallesPeliculasComponent } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
