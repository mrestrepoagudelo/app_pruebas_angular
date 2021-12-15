import {Component, ContentChildren, QueryList, AfterContentInit, ElementRef, ViewChild, OnInit, Input, SimpleChanges } from "@angular/core"; 
import {TabComponent} from "./tab.component";
  
@Component({
  selector: "m-tabs",
  template:`
    <div class="m-tabs">
      <div class="m-tabs-header" #mTabsHeader>
          <div *ngFor="let tab of tabs; let i=index" (click)="selectTab(tab)" class="m-tab-title {{tab.active == true?'tab-title-selected':''}}">
              {{ tab.tabTitle }} 
              <div *ngIf="tab.closable == true;" (click)="closeTab(tab,i,$event)" class="m-tab-close">
                  <i class="far fa-times-circle"></i>
              </div>
          </div>
      </div>
      <div class="m-tabs-content">
          <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tab.component.css']
})
export class TabsComponent implements OnInit{
  @ViewChild('mTabsHeader') mTabsHedaer:any;
  @Input() selectedIndex:any;
  @Input() changeTab:any;
  tabs: TabComponent[] = [];

  addTab(tab: TabComponent) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  selectTabIndex(indexTab:number):void {
    this.tabs.forEach((tab,index) => {
      tab.active = false;
      if(index === indexTab){
        tab.active = true;
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

  closeTab(tab: TabComponent, index:number, event:any) {
    this.tabs.splice(index, 1);
    tab.deleteTab();

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
  