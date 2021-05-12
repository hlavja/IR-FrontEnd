import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavBarModule} from "./shared/nav-bar/nav-bar.module";
import {IndexModule} from "./index/index.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {SpinnerModule} from "primeng/spinner";
import {ArticlesModule} from "./articles/articles.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NavBarModule,
    IndexModule,
    ToastModule,
    SpinnerModule,
    ArticlesModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
