import { Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
  providers: [MessageService]
})
export class ListarUsuarioComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();

  constructor(
    private el: ElementRef,
    private usuarioService:UsuarioService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
  ) { }

  data: any[] = [];
  cols: any[] = [];
  rowSelected:any;
  pageNumber:number = 0;
  pageSize:number = 10;
  totalRegistros:number = 0;
  mostrarFiltro:boolean = false;
  formUsuarioFilters:FormGroup;
  mapListCombo:any = {};
  
  ngOnInit(): void {
    this.cols = [
      {field: 'idUsuario', header: 'Id Usuario', display:"none"},
      {field: 'userName', header: 'User Name'},
      {field: 'clave', header: 'Clave'},
      {field: 'idPersona', header: 'Id Persona', display:"none"},
      {field: 'nombres', header: 'Persona'},
      {field: 'idPerfil', header: 'Id Perfil', display:"none"},
      {field: 'nombrePerfil', header: 'Perfil'},
      {field: 'activo', header: 'Activo'},
    ];

    this.formUsuarioFilters = new FormGroup({
      userName: new FormControl(''),
      clave: new FormControl(''),
      idPersona: new FormControl(''),
      idPerfil: new FormControl(''),
      activo: new FormControl(''),
    }); 

    this.loadData();
  }

  
  ngAfterViewInit(){
    this.getListasComboBox();
  }

  onClickNuevo():void{
   	this.handlerMain.emit({
      component:"listar",
      action:"NUEVO"
    });
  }

  onClickEditar():void{
    if(this.rowSelected){
      this.handlerMain.emit({
        component:"listar",
        action:"EDITAR",
        value:this.rowSelected
      });
    }
    else{
      this.messageService.add({severity:'info', summary:'Info', detail:'Debes seleccionar un registro para editar!'});
    }
  }

  onClickEliminar(event:any):void{
    if(this.rowSelected){
      this.confirmationService.confirm({
        target: event.target,
        message: 'Desea eliminar este registro?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.usuarioService.delete(this.rowSelected.idUsuario).subscribe(
            (result:any)=>{
              this.messageService.add({severity:'success', summary:'Info', detail:result.msg});
              this.loadData();
            },
            error =>{
              console.log(error);
            }
          );
        },
        reject: () => {
          
        }
      });
      
    }
    else{
      this.messageService.add({severity:'info', summary:'Info', detail:'Debes seleccionar un registro para eliminar!'});
    }
  }

  onClickFiltro(){
    this.mostrarFiltro = this.mostrarFiltro == true ?false:true;
  }

  onRowDblclick(event:any,dataRow:any): void{
    this.handlerMain.emit({
      component:"listar",
      action:"EDITAR",
      value:dataRow
    });
  }

  onChangePage(event:any){
    var {page:pageNumber, rows:pageSize} = event;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.loadData();
  }

  loadData(){
    this.usuarioService.findAll(this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  onClickBuscar(){
    this.usuarioService.findAllFilters(this.formUsuarioFilters.value,this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  getListasComboBox(){
    const listComboBox = this.el.nativeElement.querySelectorAll('ng-select');
    
    for (let index = 0; index < listComboBox.length; index++) {
      const element = listComboBox[index];
      let recurso = element.getAttribute("formControlName").replace('id', '');
      this.usuarioService.getResourcesView(recurso).subscribe(
        (result:any)=>{
          this.mapListCombo[recurso] = result;
        }
      );
    } 
  }
 
}
