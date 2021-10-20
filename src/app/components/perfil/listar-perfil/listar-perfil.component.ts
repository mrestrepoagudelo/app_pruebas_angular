import { Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { PerfilService } from 'src/app/service/perfil/perfil.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'listar-perfil',
  templateUrl: './listar-perfil.component.html',
  styleUrls: ['./listar-perfil.component.css'],
  providers: [MessageService]
})
export class ListarPerfilComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();

  constructor(
  	private el: ElementRef,
    private perfilService:PerfilService,
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
  formPerfilFilters:FormGroup;
  
  ngOnInit(): void {
    this.cols = [
			{field: 'idPerfil', header: 'Perfil', display:"none"},
			{field: 'nombrePerfil', header: 'Nombre Perfil'},
    ];

    this.formPerfilFilters = new FormGroup({
			nombrePerfil: new FormControl(''),
    }); 
    
    this.loadData();
  }
  
  ngAfterViewInit(){
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
          this.perfilService.delete(this.rowSelected.idPerfil).subscribe(
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
    this.perfilService.findAll(this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  onClickBuscar(){
    this.perfilService.findAllFilters(this.formPerfilFilters.value,this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  onClickCleanFilters(){
    this.loadData();
  }
  
 
}
