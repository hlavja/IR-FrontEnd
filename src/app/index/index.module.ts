import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccordionModule} from "primeng/accordion";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SelectButtonModule} from "primeng/selectbutton";
import {HighlightText} from "./components/transform";



@NgModule({
  declarations: [
    IndexComponent,
    HighlightText
  ],
  imports: [
    CommonModule,
    NavBarModule,
    ButtonModule,
    ReactiveFormsModule,
    AccordionModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    FormsModule
  ]
})
export class IndexModule { }
