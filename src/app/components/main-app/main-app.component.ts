import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt/jwt.service';
import { MenuTreeService } from 'src/app/service/main_app/menu-tree.service';

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
    private menuTreeService:MenuTreeService){
  }

  ngOnInit() {
    this.userName = this.jwtService.getUserName() || '';
    this.initMenuTree();
  }

  initMenuTree(){
    this.menuTree = this.menuTreeService.getMenuTree();
  }

  nodeSelect(event:Event) {
    this.menuTreeService.selectNode(event);
  }

  logoutApp(){
    this.jwtService.logOut();
    window.location.reload();
  }
}
