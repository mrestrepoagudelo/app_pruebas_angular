import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from '../listar-usuario/listar-usuario.component';

@Component({
  selector: 'main-usuario',
  templateUrl: './main-usuario.component.html',
  styleUrls: ['./main-usuario.component.css']
})
export class MainUsuarioComponent implements OnInit {

  @ViewChild(EditarUsuarioComponent)componentEditar:any;
  @ViewChild(ListarUsuarioComponent)componentListar:any;
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
