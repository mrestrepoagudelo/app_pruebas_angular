import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { DataAppService } from 'src/app/main-app/services/data-app.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  title = 'appAngular';
  rutaPrincipal = "mainApp";
  userName = "";
  menuTree:any=[];
  vistas:any=[];
  visibleSidebar:any;
  indexTab:number;
  tabs:any = [
    // { label : 'usuario' , ruta : 'mainApp/usuario', closable:true},
    // { label : 'persona' , ruta : 'mainApp/persona'},
    // { label : 'Tab2' , ruta : 'Content3', closable:true},
    // { label : 'Tab3' , ruta : 'Content4'},
    // { label : 'Tab4' , ruta : 'Content5'},
  ]

  constructor(
    private jwtService:JwtService, 
    public dataAppService:DataAppService,
    private router: Router
  ){
    this.indexTab = 1;
  }

  ngOnInit() {
    this.userName = this.jwtService.getUserName() || '';
    this.initMenuTree();
  }

  initMenuTree(){
    this.menuTree = this.dataAppService.getMenuTree();
  }

  nodeTreeSelect(event:any) {
    let node = event.node;
    if(node.recurso){
      this.openComponent(node);
    }

    console.log(this.tabs)
  }

  logoutApp(){
    this.jwtService.logOut();
    window.location.reload();
  }

  openComponent(node:any){ 
    var newTab = {
      label: node.label,
      ruta: this.rutaPrincipal +"/"+ node.ruta,
      closable: true
    }
    this.tabs.push(newTab);
    // this.router.navigate([this.pathPrincipal+"/"+ruta],{skipLocationChange:false });
  }
}
