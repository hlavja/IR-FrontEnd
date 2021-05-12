import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    NavBarModule
  ]
})
export class IndexModule { }
