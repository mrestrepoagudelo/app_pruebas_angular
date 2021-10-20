import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { FocusElement } from 'src/app/utils/UtilFocusElement';
import { PermisosMenuPerfilService } from 'src/app/service/permisos_menu_perfil/permisos_menu_perfil.service';
import { MenuTreeService } from 'src/app/service/main_app/menu-tree.service';

@Component({
  selector: 'app-permisos-menu-perfil',
  templateUrl: './permisos-menu-perfil.component.html',
  styleUrls: ['./permisos-menu-perfil.component.css'],
  providers: [MessageService]
})
export class PermisosMenuPerfilComponent implements OnInit {

  formPermisosMenuPerfil:FormGroup;
  mapListCombo:any = {};
  menuTree: TreeNode[];
  mapPermisos:any = {};

  constructor(
    private el: ElementRef,
    private permisosMenuPerfilService:PermisosMenuPerfilService,
    private messageService: MessageService, 
    private menuTreeService: MenuTreeService
  ) {

    this.formPermisosMenuPerfil = new FormGroup({
      idPerfil: new FormControl('',[Validators.required])
    }); 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.getListasComboBox();
  }

  onClickBuscarPermisos(){
    if(!this.formPermisosMenuPerfil.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes seleccionar un Perfil!'});
      return;
    }

    this.clearMenuTree();
    this.clearMapPermisos();
    
    this.permisosMenuPerfilService.findAllFilters(this.formPermisosMenuPerfil.value,0,100).subscribe(
      (result:any)=>{
        for (let index = 0; index < result.list.length; index++) {
          const element = result.list[index];
          this.mapPermisos[element.control] = "S";
        }

        let menuTree = this.menuTreeService.getMenuTree();
        this.validarPermisos(menuTree[0]);
        this.menuTree = menuTree;
      }
    );
  }

  onClickAsignarPermiso(node:any){
    if(node.recurso){
      let idPerfil = this.formPermisosMenuPerfil.controls["idPerfil"].value;
      let control = node.recurso;
      let tienePermiso = node.tienePermiso;
      
      let data = {
        idPerfil:idPerfil,
        control:control,
        tienePermiso:tienePermiso
      };

      this.guardarPermiso(data,node);
    }
  }

  guardarPermiso(data:any,node:any){
    if(!this.formPermisosMenuPerfil.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes seleccionar un Perfil!'});
      return;
    }

    this.permisosMenuPerfilService.create(data).subscribe(
      (result:any)=>{
        let tienePermiso = result.tienePermiso;
        node.tienePermiso = tienePermiso;
        this.messageService.add({severity:'success', summary:'Info', detail:result.msg});
      },
      error =>{
        console.log(error);
      }
    );
  }

  resetCombo(){
    this.clearMenuTree();
  }

  clearMenuTree(){
    this.menuTree = [];
  }

  clearMapPermisos(){
    this.mapPermisos = {};
  }

  validarPermisos(nodePadre:any){
  
    var children = nodePadre.children;
    var contChildren = 0;

    for (let index = 0; index < children.length; index++) {
      const node = children[index];
      
      //Validar si el item tiene hijos
      if(node.children){
        this.validarPermisos(node);
      }

      //El nodo es hijo
      else{

        node.type ='actionPermiso';
        
        //Vaildar si el recurso está en los permisos
        if(this.mapPermisos[node.recurso]){
          node.tienePermiso = true;
        }
        else{
          contChildren = contChildren + 1;
          node.tienePermiso = false;
        }
      }
    }
  }
  
  getListasComboBox(){
    const listComboBox = this.el.nativeElement.querySelectorAll('ng-select');
    for (let index = 0; index < listComboBox.length; index++) {
      const element = listComboBox[index];
      let recurso = element.getAttribute("formControlName").replace('id', '');
      this.permisosMenuPerfilService.getResourcesView(recurso).subscribe(
        (result:any)=>{
          this.mapListCombo[recurso] = result;
        }
      );
    }
  }
}
