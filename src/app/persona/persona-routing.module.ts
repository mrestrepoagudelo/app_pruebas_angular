import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPersonaComponent } from './pages/main-persona/main-persona.component';

const routes: Routes = [
  { 
    path:'', 
    children:[
      { path:'**', component: MainPersonaComponent},
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class PersonaRoutingModule { }
