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
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
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

  public setPermisos(permisos:any): void{
    let listaPermisos = [];

    if(permisos.list === "allPrivileges"){
      listaPermisos.push(permisos.list);
    }
    else{
      for (let index = 0; index < permisos.list.length; index++) {
        const element = permisos.list[index];
        listaPermisos.push(element.control);
      }
    }
    
    window.localStorage.removeItem(PERSMISOS);
    window.localStorage.setItem(PERSMISOS, JSON.stringify(listaPermisos));
  }

  public getPermisos(){
    let listaPermisos = JSON.parse(localStorage.getItem(PERSMISOS) || '{}');
    return listaPermisos;
  }

  public getTienePermiso(recurso:string):boolean{
    let listaPermisos = this.getPermisos();

    if(listaPermisos.includes("allPrivileges")){
      return true;
    }  
    
    if(listaPermisos.includes(recurso)){
      return true;
    }    
    return false;
  }

  public logOut():void{
    window.localStorage.clear();
  }
}
