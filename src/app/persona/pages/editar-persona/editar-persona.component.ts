import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilValidator } from 'src/app/core/utils/UtilValidator';
import { FocusElement } from 'src/app/core/utils/UtilFocusElement';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
  providers: [MessageService]
})

export class EditarPersonaComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();
  formPersona:FormGroup;
  mapListCombo:any = {};

  constructor(
    private el: ElementRef,
    private personaService:PersonaService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) {

    this.formPersona = new FormGroup({
      idPersona: new FormControl(''),
      nombres: new FormControl('',[Validators.required]),
      primerApellido: new FormControl('',[Validators.required]),
      segundoApellido: new FormControl(''),
      numeroIdentificacion: new FormControl('',[Validators.required, Validators.pattern(UtilValidator.number)]),
      idTipoIdentificacion: new FormControl('',[Validators.required, Validators.pattern(UtilValidator.number)]),
      email: new FormControl('',[Validators.email]),
    }); 
  }

  ngOnInit(): void {
    this.getListasComboBox();
  }

  editar(row:any){
    this.personaService.findById(row.idPersona).subscribe(
      (result:any)=>{
        this.formPersona.patchValue(result);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onClickGuardar(){
    if(!this.formPersona.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes ingresar los campos obligatorios!'});
      FocusElement(this.el);
      return;
    }

    this.personaService.create(this.formPersona.value).subscribe(
      (result:any)=>{
        this.formPersona.patchValue(result);
        this.messageService.add({severity:'success', summary:'Info', detail:"Registro guardado correctamente!"});
      },
      error =>{
        console.log(error);
      }
    );
  }

  onClickEliminar(event:any){
    var idPersona = this.formPersona.value.idPersona;
    if(idPersona){
      this.confirmationService.confirm({
        target: event.target,
        message: 'Desea eliminar este registro?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.personaService.delete(idPersona).subscribe(
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
    else{
      this.messageService.add({severity:'info', summary:'Info', detail:'Debes seleccionar un registro para eliminar!'});
    }
  }
  
  onClickNuevo(){
    this.formPersona.reset();
  }

  onClickCancelar(){
    this.handlerMain.emit({
      component:"editar",
      action:"CANCELAR"
    });
  }

  getListasComboBox(){
    for (const property in this.formPersona.value) {
      if(property != "idPersona" && property.startsWith("id")){
        let recurso = property.replace('id', '');
        this.personaService.getResourcesView(recurso).subscribe((result:any)=>{
            this.mapListCombo[recurso] = result;
          }
        );
      }
    }    
  }
}
