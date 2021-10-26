import {Component, ContentChildren, QueryList, AfterContentInit, ElementRef, ViewChild, OnInit, Input, SimpleChanges } from "@angular/core"; 
import {TabComponent} from "./tab.component";
  
@Component({
  selector: "m-tabs",
  template:`
    <div class="m-tabs">

      <div class="m-tabs-header" #mTabsHeader>
          <div *ngFor="let tab of tabs; let i = index" (click)="selectTab(tab)" class="m-tab-title {{tab.active == true?'tab-title-selected':''}}">
              {{ tab.tabTitle }} 
              <div *ngIf="tab.closable == true;" (click)="closeTab(tab,$event)" class="m-tab-close">
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
export class TabsComponent{
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild('mTabsHeader') mTabsHedaer:any;
  @Input() selectedIndex:any;
  @Input() changeTab:any;
  // tabs: TabComponent[] = [];

  ngAfterViewInit() {
    let _this = this;
    setTimeout(function(){
      _this.selectTabIndex(_this.selectedIndex);  
    });
  }
  
  ngOnChanges(changes: SimpleChanges){
    if(changes.selectedIndex && changes.selectedIndex.firstChange == false){
      let indexTab = changes.selectedIndex.currentValue;
      this.selectTabIndex(indexTab);
    }
  }

  selectTabIndex(indexTab:number):void {
    let _this = this;
    this.tabs.toArray().forEach(function (tab,index) {
      if(indexTab == index){
        _this.selectTab(tab);
        return;
      }
    });
  }

  getTabs(){
    return this.tabs;
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
  }

  selectFirstTab(){
    this.tabs.first.active = true;
  }

  closeTab(tab: TabComponent, event:any) {
      event.stopPropagation();
      let tabTitle = event.target.parentElement.parentElement;
      tabTitle.remove();
      tab.deleteTab();
  
      if (tabTitle.classList.contains('tab-title-selected')) {
        this.selectFirstTab();
      }
  }
}
  