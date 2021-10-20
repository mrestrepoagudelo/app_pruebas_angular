import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { EditarPersonaComponent } from '../editar-persona/editar-persona.component';
import { ListarPersonaComponent } from '../listar-persona/listar-persona.component';

@Component({
  selector: 'main-persona',
  templateUrl: './main-persona.component.html',
  styleUrls: ['./main-persona.component.css']
})
export class MainPersonaComponent implements OnInit {

  @ViewChild(EditarPersonaComponent)componentEditar:any;
  @ViewChild(ListarPersonaComponent)componentListar:any;
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
