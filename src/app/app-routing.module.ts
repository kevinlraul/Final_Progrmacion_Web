import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { DetallesPeliculasComponent} from './detalles-peliculas/detalles-peliculas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ChatComponent } from './chat/chat.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { AuthguardGuard } from './guard/auth-guard.service';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent} , 
    { path: 'register', component: RegisterComponent } ,
    { path: 'peliculas', component: PeliculasComponent , canActivate: [AuthguardGuard] },
    { path: 'detalles_pelicula/:id', component: DetallesPeliculasComponent , canActivate: [AuthguardGuard]},
    { path: 'perfil/:id', component: PerfilComponent , canActivate: [AuthguardGuard]},
    { path: 'chat', component: ChatComponent , canActivate: [AuthguardGuard]},   
    { path: 'chat/:id', component: ChatComponent , canActivate: [AuthguardGuard]},
    { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthguardGuard] },
    {path: 'contenido', component : ContenidoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
