import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";
const USER_NAME = "AuthUserName";
const PERSMISOS = "AuthPermisos";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
 
  constructor() { }

  public setToken(token:string): void{
    this.clearToken();
    window.localStorage.setItem(TOKEN_KEY,token);
  }

  public clearToken(){
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName:string): void{
    window.localStorage.removeItem(USER_NAME);
    window.localStorage.setItem(USER_NAME,userName);
  }

  public getUserName(){
    return localStorage.getItem(USER_NAME);
  }

  public logOut():void{
    window.localStorage.clear();
  }
}
