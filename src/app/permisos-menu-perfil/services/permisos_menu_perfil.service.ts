import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosMenuPerfilService {

  url:string = "http://localhost:8080/api/permisosMenuPerfil";
  
  constructor(private http:HttpClient) { }

  findAll(pageNumber:any,pageSize:any):Observable<any>{
    return this.http.get(this.url+"/findAll/"+pageNumber+"/"+pageSize);
  }

  findAllFilters(mapFilters:any,pageNumber:any,pageSize:any):Observable<any>{
    return this.http.post(this.url+"/findAllFilters/"+pageNumber+"/"+pageSize, mapFilters);
  }
  
  create(object:any):Observable<any>{
      return this.http.post(this.url+"/create",object);
  }
  
  getResourcesView(recurso:string){
    return this.http.get(this.url+"/getResourcesView/"+recurso);
  }

}
