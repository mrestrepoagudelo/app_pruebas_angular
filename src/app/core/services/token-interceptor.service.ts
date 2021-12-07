import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import {MessageService} from 'primeng/api';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private jwtService:JwtService,
    private router: Router,
    private messageService: MessageService, 
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const token = this.jwtService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);

        if([403, 404].indexOf(err.status) !== -1){
          // this.jwtService.logOut();
          // this.router.navigate(["/login"]);
          this.messageService.add({severity:'error', summary:'Info', detail:err.error.message, life:4000});
        }
        else if(err.status == 401){
          if(err.error){
            this.messageService.add({severity:'error', summary:'Info', detail:err.error.message, life:4000});
          } 
        }

        else{
          let msg = "";
          if(err.error.message){
            msg = err.error.message;
          }
          else{
            msg = err.message;
          }
          this.messageService.add({severity:'error', summary:'Info', detail:msg, life:4000});
        }
  
        return throwError(err)
      })
    );
  }
}
