import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  tokenStatus: any;

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      
      //Make reference for loadToken(return token true or false)
      let tokenStatus = this.userService.loadToken();

      //Check tokenStatus
      if(!tokenStatus){
        this.router.navigate(['login']);
        return false;
      }else if(tokenStatus){
        return true;
      }

  }
  
}
