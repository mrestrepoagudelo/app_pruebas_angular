import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api/treenode';

@Injectable({
  providedIn: 'root'
})
export class DataAppService {
  titleSelectOption:string = '';
  pathPrincipal:string = 'mainApp';
  menuTree:any;
  menuTreeConPermisos:any;

  constructor(private router: Router) {
    this.menuTree = [
      {
        label: 'App',
        expanded:true,
        children: [
          {label: 'Personas', icon: 'fas fa-users', styleClass:"node-tree", recurso:"persona", ruta:"persona"},
          {label: 'Seguridad', icon: 'fas fa-shield-alt',
            children:[
              {label: 'Usuarios', icon: 'fas fa-user', styleClass:"node-tree", recurso:"usuario", ruta:"usuario"},
              {label: 'Perfil', icon: 'fas fa-user-lock', styleClass:"node-tree", recurso:"perfil", ruta:"perfil"},
              {label: 'Asignar permisos', icon: 'fas fa-user-shield', styleClass:"node-tree", recurso:"permisosMenuPerfil", ruta:"permisosMenuPerfil"}
            ]
          }
        ]
      }
    ];
  }

  getNodeWithKey(recurso: string, nodes: any) :any{
    for (let node of nodes) {
      if (node.recurso === recurso) {
         return node;
      }
 
      if (node.children) {
        let matchedNode = this.getNodeWithKey(recurso, node.children);
        if (matchedNode) {
          return matchedNode;
        }
      }
    }
 }

  setRecursosPermisos(listRecursos:any = []){
    this.menuTreeConPermisos = [...this.menuTree];
    for (let index = 0; index < listRecursos.length; index++) {
      const recurso = listRecursos[index].control;
      let node = this.getNodeWithKey(recurso,this.menuTreeConPermisos);
      if(node){
        node.styleClass = "node-visible";
      }
    }
  }

  getMenuTree(){
    return this.menuTreeConPermisos;
  }

  changeTitle(title:string){
    this.titleSelectOption = title;
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
    let label = node.label;
    this.router.navigate([this.pathPrincipal+"/"+ruta],{ queryParams: {recurso:recurso,label:label},skipLocationChange:false });
  }
}
