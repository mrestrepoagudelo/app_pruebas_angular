import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainAppComponent } from './main-app/main-app.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgCustomModule } from './shared/prime-ng-custom.module';
import { LoginComponent } from './login/pages/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainAppComponent,
  ],
  entryComponents:[
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgCustomModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
