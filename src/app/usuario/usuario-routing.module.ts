import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsuarioComponent } from './pages/main-usuario/main-usuario.component';

const routes: Routes = [
  { 
    path:'', 
    children:[
      { path:'**', component: MainUsuarioComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule { }
