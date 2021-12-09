import { Component,OnInit } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { DataAppService } from 'src/app/main-app/services/data-app.service';

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
