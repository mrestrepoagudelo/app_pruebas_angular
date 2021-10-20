import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuTreeService {
  pathPrincipal = "mainApp"
  menuTree:any;
  constructor(private router: Router) {

    this.menuTree = [
      {
        label: 'App',
        expanded:true,
        children: [
          {label: 'Personas', icon: 'fas fa-users', recurso:"persona", ruta:"persona"},
          {label: 'Seguridad', icon: 'fas fa-shield-alt',
            children:[
              {label: 'Usuarios', icon: 'fas fa-user', recurso:"usuario", ruta:"usuario"},
              {label: 'Perfil', icon: 'fas fa-user-lock', recurso:"perfil", ruta:"perfil"},
              {label: 'Asignar permisos', icon: 'fas fa-user-shield', recurso:"permisosMenuPerfil", ruta:"permisosMenuPerfil"}
            ]
          }
        ]
      }
    ];
  }

  getMenuTree(){
    return this.menuTree;
  }

  selectNode(event:any){
    let node = event.node;
    if(node.recurso){
      this.openComponent(node);
    }
  }

  openComponent(node:any){
    let ruta = node.ruta;
    let recurso = node.recurso;
    this.router.navigate([this.pathPrincipal+"/"+ruta],{ queryParams: {recurso:recurso},skipLocationChange:false });
  }
}
