import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermisosMenuPerfilComponent } from './pages/permisos-menu-perfil.component';

const routes: Routes = [
  { 
    path:'', 
    children:[
      { path:'**', component: PermisosMenuPerfilComponent},
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PermisosMenuPerfilRoutingModule { }
