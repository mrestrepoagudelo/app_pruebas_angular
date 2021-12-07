import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaRoutingModule } from './persona-routing.module';
import { PrimeNgCustomModule } from '../shared/prime-ng-custom.module';
import { MainPersonaComponent } from './pages/main-persona/main-persona.component';
import { ListarPersonaComponent } from './pages/listar-persona/listar-persona.component';
import { EditarPersonaComponent } from './pages/editar-persona/editar-persona.component';

@NgModule({
  declarations: [  
    MainPersonaComponent,
    ListarPersonaComponent,
    EditarPersonaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgCustomModule,
    PersonaRoutingModule,
  ]
})
export class PersonaModule { }
