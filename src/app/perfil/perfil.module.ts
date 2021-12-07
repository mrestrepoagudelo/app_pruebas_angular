import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgCustomModule } from '../shared/prime-ng-custom.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { MainPerfilComponent } from './pages/main-perfil/main-perfil.component';
import { ListarPerfilComponent } from './pages/listar-perfil/listar-perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';

@NgModule({
  declarations: [
    MainPerfilComponent,
    ListarPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    PrimeNgCustomModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
