import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabRouteComponent } from '../core/components/tabs-router/tab-route.component';
import { TabsRouteComponent } from '../core/components/tabs-router/tabs-route.component';
import { TabComponent } from '../core/components/tabs/tab.component';
import { TabsComponent } from '../core/components/tabs/tabs.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabsRouteComponent,
    TabRouteComponent
  ],
  imports:[
    CommonModule
  ],
  exports:[
    TabsComponent,
    TabComponent,
    TabsRouteComponent,
    TabRouteComponent
  ]
})
export class MyComponentsModule { }
