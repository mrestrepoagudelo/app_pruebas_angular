import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../service/jwt.service';
import {MessageService} from 'primeng/api';
import { DataAppService } from '../main-app/services/data-app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardRouter implements CanActivateChild, CanActivate {

  constructor(
    private router: Router, 
    private jwtService: JwtService,
    private dataAppService:DataAppService,
    private messageService: MessageService
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      let recurso:string = childRoute.queryParams.recurso || '';
      let label:string = childRoute.queryParams.label || '';
      this.dataAppService.changeTitle(label);
     
      if(!this.jwtService.getToken()){
        this.router.navigate(["/login"]);
        return false;
      }

      return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.jwtService.getToken()){
        return true;
      }

      this.router.navigate(["/login"]);
      return false;
  }
}
