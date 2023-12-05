import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Final_Progra_Web';
  logoutbtn: boolean;
  loginbtn: boolean;
  myToken: any;
  isAdmin: any;

  constructor(private dataService: ApiService ,private router: Router) { 
    
    this.myToken = dataService.getToken();     
   // dataService.getLoggedInName.subscribe(name => this.changeName(name));
   //dataService.getLoggedInAdmin.subscribe(() => 
   
   
 
 
    if (this.dataService.registrado()) {      
      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false;
      this.isAdmin = false;
    }
  }

  pipa(){
    if (this.dataService.registrado()) {      
      this.loginbtn = false;
      this.logoutbtn = true
      this.getAdmin() 
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false;
      this.isAdmin = false;
    }
  }


  private changeName(name: boolean): void { 
    this.loginbtn = !name;
  }    

  redireccionPerfil() {
    if (this.myToken!= null){
      this.router.navigate([`./perfil/${this.myToken}`]);
    }
    else {
      this.myToken = this.dataService.getToken();
      this.router.navigate([`./perfil/${this.myToken}`]);
    }
  }

  private getAdmin() {
    let rol = Number(this.dataService.getRol());
    this.isAdmin = rol == 1
  }

  logout() {
    this.dataService.deleteToken();
    window.location.href = '';
  }

  ngOnInit(): void {   
    this.myToken = this.dataService.getToken();
    this.getAdmin()       
  }
}
