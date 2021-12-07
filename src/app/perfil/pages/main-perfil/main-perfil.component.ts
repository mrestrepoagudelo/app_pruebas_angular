import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { ListarPerfilComponent } from '../listar-perfil/listar-perfil.component';

@Component({
  selector: 'main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.css']
})
export class MainPerfilComponent implements OnInit {
  @ViewChild(EditarPerfilComponent)componentEditar:any;
  @ViewChild(ListarPerfilComponent)componentListar:any;
  public index:number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  handlerMain(emitter:any){

    //listener actions component-listar
    if(emitter.component == "listar"){
      
      if(emitter.action == "EDITAR"){
        this.componentEditar.editar(emitter.value);
        this.changeTab(1);
      }

      if(emitter.action == "NUEVO"){
        this.componentEditar.onClickNuevo();
        this.changeTab(1);
      }
    }

    //listener actions component-editar
    if(emitter.component == "editar"){
      
      if(emitter.action == "CANCELAR"){
        this.changeTab(0);
        this.componentListar.loadData();
      }
    }
    
  }

  handleChange(e: any) {
    this.index = e.index;
  }

  changeTab(index: number): void {
    this.index = index;
  }
}
