import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainPersonaComponent } from './components/persona/main-persona/main-persona.component';
import { ListarPersonaComponent } from './components/persona/listar-persona/listar-persona.component';
import { EditarPersonaComponent } from './components/persona/editar-persona/editar-persona.component';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import { AppRoutingModule } from './routers/app-routing.module';
import {SidebarModule} from 'primeng/sidebar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TabMenuModule} from 'primeng/tabmenu';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { TokenInterceptorService } from './service/interceptors/token-interceptor.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MainUsuarioComponent } from './components/usuario/main-usuario/main-usuario.component';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { MainPerfilComponent } from './components/perfil/main-perfil/main-perfil.component';
import { ListarPerfilComponent } from './components/perfil/listar-perfil/listar-perfil.component';
import { EditarPerfilComponent } from './components/perfil/editar-perfil/editar-perfil.component';
import { PermisosMenuPerfilComponent } from './components/permisos-menu-perfil/permisos-menu-perfil.component';
import {TreeTableModule} from 'primeng/treetable';
import {TreeModule} from 'primeng/tree';

@NgModule({
  declarations: [
    AppComponent,
    MainPersonaComponent,
    ListarPersonaComponent,
    EditarPersonaComponent,

    MainUsuarioComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent,
    LoginComponent,

    MainPerfilComponent,
    ListarPerfilComponent,
    EditarPerfilComponent,

    PageNotFoundComponent,
    MainAppComponent,
    PermisosMenuPerfilComponent
  ],
  entryComponents:[
  ],
  imports: [
    NgSelectModule,
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    TabViewModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ToastModule,
    ConfirmPopupModule,
    InputTextModule,
    MenubarModule,
    AppRoutingModule,
    SidebarModule,
    TabMenuModule,
    AutoCompleteModule,
    TreeTableModule,
    TreeModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
