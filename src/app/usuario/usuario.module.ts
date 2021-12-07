import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { PrimeNgCustomModule } from '../shared/prime-ng-custom.module';
import { MainUsuarioComponent } from './pages/main-usuario/main-usuario.component';
import { ListarUsuarioComponent } from './pages/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    MainUsuarioComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimeNgCustomModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
