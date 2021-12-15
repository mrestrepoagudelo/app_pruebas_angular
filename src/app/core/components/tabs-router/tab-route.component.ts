import { Component,Input} from "@angular/core";
import { TabsRouteComponent } from "./tabs-route.component";

@Component({
  selector: "m-tab-route",
  template:`
    <div [hidden]="!active" class="m-tab">
        <ng-content></ng-content>
    </div>
  `
})
export class TabRouteComponent{
    @Input() tabTitle:any;
    @Input() closable:any;
    @Input() active:any;
    @Input() ruta:any;

    constructor(tabs:TabsRouteComponent) {
      tabs.addTab(this);
    }
}
