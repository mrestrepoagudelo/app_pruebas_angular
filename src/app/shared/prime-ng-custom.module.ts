import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [],
  imports: [
    NgSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ToastModule,
    ConfirmPopupModule,
    InputTextModule,
    MenubarModule,
    SidebarModule,
    TabMenuModule,
    AutoCompleteModule,
    TreeTableModule,
    TreeModule
  ],
  exports:[
    NgSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    CardModule,
    PaginatorModule,
    ToastModule,
    ConfirmPopupModule,
    InputTextModule,
    MenubarModule,
    SidebarModule,
    TabMenuModule,
    AutoCompleteModule,
    TreeTableModule,
    TreeModule
  ]
})

export class PrimeNgCustomModule { }