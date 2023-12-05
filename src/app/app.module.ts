import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { DetallesPeliculasComponent } from './detalles-peliculas/detalles-peliculas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ChatComponent } from './chat/chat.component';
import { ContenidoComponent } from './contenido/contenido.component';
 

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    DetallesPeliculasComponent,
    LoginComponent,
    RegisterComponent,
    UsuarioComponent,
    PerfilComponent,
    ChatComponent,
    ContenidoComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
