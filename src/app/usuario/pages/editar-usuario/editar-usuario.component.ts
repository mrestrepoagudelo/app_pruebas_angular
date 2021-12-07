import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilValidator } from 'src/app/utils/UtilValidator';
import { FocusElement } from 'src/app/utils/UtilFocusElement';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  providers: [MessageService]
})

export class EditarUsuarioComponent implements OnInit {

  @Output() handlerMain = new EventEmitter();
  formUsuario:FormGroup;
  mapListCombo:any = {};
  
  constructor(
    private el: ElementRef,
    private usuarioService:UsuarioService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) {

    this.formUsuario = new FormGroup({
      idUsuario: new FormControl(''),
      userName: new FormControl('',[Validators.required]),
      clave: new FormControl('',[Validators.required]),
      idPersona: new FormControl('',[Validators.required, Validators.pattern(UtilValidator.number)]),
      idPerfil: new FormControl('',[Validators.required, Validators.pattern(UtilValidator.number)]),
      activo: new FormControl('',[Validators.required]),
    }); 
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.getListasComboBox();
  }

  editar(row:any){
    if(Object.entries(row).length === 0){
      this.onClickNuevo();
    }
    else{
      this.formUsuario.patchValue(row);
    }   
  }

  onClickGuardar(){
    if(!this.formUsuario.valid){
      this.messageService.add({severity:'warn', summary:'Info', detail:'Debes ingresar los campos obligatorios!'});
      FocusElement(this.el);
      return;
    }

    this.usuarioService.create(this.formUsuario.value).subscribe(
      (result:any)=>{
        this.formUsuario.patchValue(result);
        this.messageService.add({severity:'success', summary:'Info', detail:"Registro guardado correctamente!"});
      },
      error =>{
        console.log(error);
      }
    );
  }

  onClickEliminar(event:any){
    var idUsuario = this.formUsuario.value.idUsuario;
    this.confirmationService.confirm({
      target: event.target,
      message: 'Desea eliminar este registro?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.delete(idUsuario).subscribe(
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
    this.formUsuario.reset();
  }

  onClickCancelar(){
    this.handlerMain.emit({
      component:"editar",
      action:"CANCELAR"
    });
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
