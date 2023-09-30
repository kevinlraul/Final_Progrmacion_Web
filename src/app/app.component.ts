import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Final_Progra_Web';
  logoutbtn: boolean;
 
constructor(private dataService: ApiService) {    
    this.logoutbtn= true;
  }

  logout() {
    window.location.href = '';
  }
  
  ngOnInit(): void {
  }
}
