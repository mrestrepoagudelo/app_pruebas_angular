import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url:string = "http://localhost:8080/api/persona";

  constructor(private http:HttpClient) { }

  findAll(pageNumber:any,pageSize:any):Observable<any>{
    return this.http.get(this.url+"/findAll/"+pageNumber+"/"+pageSize);
  }

  findAllFilters(mapFilters:any,pageNumber:any,pageSize:any):Observable<any>{
    return this.http.post(this.url+"/findAllFilters/"+pageNumber+"/"+pageSize, mapFilters);
  }

  delete(id:number):Observable<any>{
    return this.http.get(this.url+"/delete/"+id);
  }

  findById(id:number):Observable<any>{
    return this.http.get(this.url+"/findById/"+id);
  }

  create(object:any):Observable<any>{
    return this.http.post(this.url+"/create",object);    
  }

  getResourcesView(recurso:string){
    return this.http.get(this.url+"/getResourcesView/"+recurso);
  }
}
