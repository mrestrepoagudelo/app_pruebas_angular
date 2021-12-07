import { Component, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { PersonaService } from 'src/app/persona/services/persona.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css'],
  providers: [MessageService]
})
export class ListarPersonaComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();

  constructor(
  	private el: ElementRef,
    private personaService:PersonaService,
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
  formPersonaFilters:FormGroup;
  mapListCombo:any = {};
  
  ngOnInit(): void {
    this.cols = [
			{field: 'idPersona', header: 'Id Persona', display:"none"},
			{field: 'nombres', header: 'Nombres'},
			{field: 'primerApellido', header: 'Primer Apellido'},
			{field: 'segundoApellido', header: 'Segundo Apellido'},
			{field: 'numeroIdentificacion', header: 'Número Identificación'},
			{field: 'idTipoIdentificacion', header: 'Tipo identificación', display:"none"},
			{field: 'descripcion', header: 'Tipo de identificación'},
			{field: 'email', header: 'Email'},
    ];

    this.formPersonaFilters = new FormGroup({
			nombres: new FormControl(''),
			primerApellido: new FormControl(''),
			segundoApellido: new FormControl(''),
			numeroIdentificacion: new FormControl(''),
			idTipoIdentificacion: new FormControl(''),
			email: new FormControl(''),
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
          this.personaService.delete(this.rowSelected.idPersona).subscribe(
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
    this.personaService.findAll(this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  onClickBuscar(){
    this.personaService.findAllFilters(this.formPersonaFilters.value,this.pageNumber,this.pageSize).subscribe(
      (result:any)=>{
        this.data = result.list;
        this.totalRegistros = result.totalRegistros;
      }
    );
  }
  
  onClickCleanFilters(){
    this.loadData();
  }
  
  getListasComboBox(){
    const listComboBox = this.el.nativeElement.querySelectorAll('ng-select');
    
    for (let index = 0; index < listComboBox.length; index++) {
      const element = listComboBox[index];
      let recurso = element.getAttribute("formControlName").replace('id', '');
      this.personaService.getResourcesView(recurso).subscribe(
        (result:any)=>{
          this.mapListCombo[recurso] = result;
        }
      );
    } 
  }
 
}
