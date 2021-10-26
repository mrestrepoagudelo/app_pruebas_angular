import { Component, ViewChild, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt/jwt.service';
import { DataAppService } from 'src/app/service/main_app/data-app.service';
import { MainPersonaComponent } from '../persona/main-persona/main-persona.component';
import { MainUsuarioComponent } from '../usuario/main-usuario/main-usuario.component';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  title = 'appAngular';
  userName = "";
  menuTree:any=[];
  itemsTabs:any=[];
  vistas:any=[];
  visibleSidebar:any;

  constructor(
    private jwtService:JwtService, 
    public dataAppService:DataAppService
  ){
  }

  ngOnInit() {
    this.userName = this.jwtService.getUserName() || '';
    this.initMenuTree();
  }

  initMenuTree(){
    this.menuTree = this.dataAppService.getMenuTree();
  }

  nodeSelect(event:Event) {
    this.dataAppService.selectNode(event);
  }

  logoutApp(){
    this.jwtService.logOut();
    window.location.reload();
  }
}
