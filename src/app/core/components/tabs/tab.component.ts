import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { TabsComponent } from "./tabs.component";

@Component({
  selector: "m-tab",
  template:`
    <div [hidden]="!active" class="m-tab">
        <ng-content></ng-content>
    </div>
  `
})
export class TabComponent{
    @Input() tabTitle:any;
    @Input() closable:any;
    @Input() active:any;
  
    constructor(private el: ElementRef, tabs:TabsComponent) {
        tabs.addTab(this);
    }

    deleteTab(){
        this.el.nativeElement.remove();
    }
}
