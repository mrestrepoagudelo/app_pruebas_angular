import {Component, ViewChild, OnInit, Input } from "@angular/core"; 
import { Router, RouterLink } from "@angular/router";
import { TabRouteComponent } from "./tab-route.component";
  
@Component({
  selector: "m-tabs-route",
  template:`
    <div class="m-tabs-header" #mTabsHeader>
        <div *ngFor="let tab of tabs; let i=index" (click)="selectTab(tab)" class="m-tab-title {{tab.active == true?'tab-title-selected':''}}">
            {{ tab.tabTitle }} 
            <div *ngIf="tab.closable == true;" (click)="closeTab(tab,i,$event)" class="m-tab-close">
                <i class="far fa-times-circle"></i>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./tab-route.component.css']
})
export class TabsRouteComponent implements OnInit{
  @ViewChild('mTabsHeader') mTabsHedaer:any;
  @Input() selectedIndex:any;
  @Input() changeTab:any;
  tabs: TabRouteComponent[] = [];

  constructor(private router: Router) {

  }

  addTab(tab: TabRouteComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: TabRouteComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    this.router.navigate([tab.ruta],{ skipLocationChange:false });
  }

  selectTabIndex(indexTab:number):void {
    this.tabs.forEach((tab,index) => {
      if(index === indexTab){
        this.selectTab(tab);
      }
    });   
  }

  ngOnInit() {
    this.selectTabIndex(3);
    let _this = this;
    setTimeout(function(){
      _this.selectTabIndex(_this.selectedIndex);  
    });
  }

  closeTab(tab: TabRouteComponent, index:number, event:any) {
    this.tabs.splice(index, 1);
    if (tab.active) {
      this.selectTabIndex(0);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  
  getTabs(){
    return this.tabs;
  }
}
  