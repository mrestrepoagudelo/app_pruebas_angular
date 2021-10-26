import { Component, ComponentFactoryResolver, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { MainPersonaComponent } from "../../persona/main-persona/main-persona.component";
import { TabsComponent } from "./tabs.component";

@Component({
  selector: "m-tab",
  template: `
    <div [hidden]="!active" class="m-tab">
        <ng-content></ng-content>
        <ng-container #contentComponent></ng-container>
    </div>
  `
})
export class TabComponent{
    @Input() tabTitle:any;
    @Input() closable:any;
    @Input() active:any;
    @Input() component:any;
    @ViewChild("contentComponent", {read:ViewContainerRef}) contentComponent:ViewContainerRef;
  
    constructor(
        private el: ElementRef, 
        private componentFactoryResolver: ComponentFactoryResolver
    ) {

    }

    ngAfterViewInit(){
        if(this.component){
            this.crearComponentView();
        }
    }

    deleteTab(){
        this.el.nativeElement.remove();
    }

    crearComponentView(){
        var _this = this;
        setTimeout(function(){
            const componentFR = _this.componentFactoryResolver.resolveComponentFactory(_this.component);
            _this.contentComponent.createComponent(componentFR);
        });
    }
}
