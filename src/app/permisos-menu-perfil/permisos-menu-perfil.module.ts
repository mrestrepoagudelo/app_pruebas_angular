import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosMenuPerfilRoutingModule } from './permisos-menu-perfil-routing.module';
import { PermisosMenuPerfilComponent } from './pages/permisos-menu-perfil.component';
import { PrimeNgCustomModule } from '../shared/prime-ng-custom.module';

@NgModule({
  declarations: [
    PermisosMenuPerfilComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgCustomModule,
    PermisosMenuPerfilRoutingModule
  ]
})
export class PermisosMenuPerfilModule { }
