import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AuthGuardRouter } from './core/guards/auth-guard.guard';
import { LoginComponent } from './login/pages/login.component';

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
      {path:'persona', loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)},
      {path:'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)},
      {path:'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)},
      {path:'permisosMenuPerfil', loadChildren: () => import('./permisos-menu-perfil/permisos-menu-perfil.module').then(m => m.PermisosMenuPerfilModule)}
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
