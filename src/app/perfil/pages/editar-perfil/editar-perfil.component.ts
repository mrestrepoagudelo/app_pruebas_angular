import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FocusElement } from 'src/app/core/utils/UtilFocusElement';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
  providers: [MessageService]
})

export class EditarPerfilComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();
  formPerfil:FormGroup;
  
  constructor(
    private el: ElementRef,
    private perfilService:PerfilService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) {

	this.formPerfil = new FormGroup({
		idPerfil: new FormControl(''),
		nombrePerfil: new FormControl('',[Validators.required])
	}); 
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
  }

  editar(row:any){
    if(Object.entries(row).length === 0){
      this.onClickNuevo();
    }
    else{
      this.formPerfil.patchValue(row);
    }   
  }

  onClickGuardar(){
    if(!this.formPerfil.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes ingresar los campos obligatorios!'});
      FocusElement(this.el);
      return;
    }

    this.perfilService.create(this.formPerfil.value).subscribe(
      (result:any)=>{
        this.formPerfil.patchValue(result);
        this.messageService.add({severity:'success', summary:'Info', detail:"Registro guardado correctamente!"});
      },
      error =>{
        console.log(error);
      }
    );
  }

  onClickEliminar(event:any){
    var idPerfil = this.formPerfil.value.idPerfil;
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar este registro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.perfilService.delete(idPerfil).subscribe(
          (result:any)=>{
            this.messageService.add({severity:'success', summary:'Info', detail:result.msg});
            this.onClickNuevo();
          },
          error =>{
            console.log(error);
          }
        );
      },
      reject: () => {}
    });
  }
  
  onClickNuevo(){
    this.formPerfil.reset();
  }

  onClickCancelar(){
    this.handlerMain.emit({
      component:"editar",
      action:"CANCELAR"
    });
  }
  
 
}
