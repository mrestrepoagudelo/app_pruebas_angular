import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPersonaComponent } from '../components/persona/main-persona/main-persona.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { MainAppComponent } from '../components/main-app/main-app.component';
import { AuthGuardRouter } from '../guards/auth-guard.guard';
import { MainUsuarioComponent } from '../components/usuario/main-usuario/main-usuario.component';
import { MainPerfilComponent } from '../components/perfil/main-perfil/main-perfil.component';
import { PermisosMenuPerfilComponent } from '../components/permisos-menu-perfil/permisos-menu-perfil.component';

const routes: Routes = [
  { 
    path:'', 
    pathMatch:'full', 
    redirectTo:'/login' 
  },

  { 
    path:'login', 
    component: LoginComponent
  },

  { 
    path:'mainApp', 
    component: MainAppComponent, 
    canActivate:[AuthGuardRouter], 
    canActivateChild:[AuthGuardRouter], 
    children:[
      {path:'persona', component: MainPersonaComponent},
      {path:'usuario', component: MainUsuarioComponent},
      {path:'perfil', component: MainPerfilComponent},
      {path:'permisosMenuPerfil', component: PermisosMenuPerfilComponent}
    ]
  },

  {
    path:'**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
