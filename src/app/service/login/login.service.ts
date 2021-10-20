import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL:string = "http://localhost:8080/api/login";

  constructor(private http:HttpClient) { }

  login(object:any):Observable<any>{
      return this.http.post(this.URL,object);
  }
}
