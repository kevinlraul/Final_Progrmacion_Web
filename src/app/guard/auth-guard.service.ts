import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
    
    constructor(private dataService: ApiService, private router: Router) { }
     canActivate(
        
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): any {
            let routeurl: string = state.url; 
        return this.registrado(routeurl);
    }
 
    registrado(routeurl: string) { 
        if (this.dataService.registrado()) {            
            return true;
        }
        this.dataService.redirectUrl = routeurl; // sigo pensando si es necesario o no 
        this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl } }); 
        return false;
    }
}