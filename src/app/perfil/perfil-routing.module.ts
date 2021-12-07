import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPerfilComponent } from './pages/main-perfil/main-perfil.component';

const routes: Routes = [
  { 
    path:'', 
    children:[
      { path:'**', component: MainPerfilComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PerfilRoutingModule { }
