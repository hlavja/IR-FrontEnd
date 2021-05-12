import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './components/articles.component';
import {NavBarModule} from "../shared/nav-bar/nav-bar.module";
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SelectButtonModule} from "primeng/selectbutton";
import {RouterModule} from "@angular/router";
import { EditArticlePopupComponent } from './components/edit-article-popup/edit-article-popup.component';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";



@NgModule({
  declarations: [
    ArticlesComponent,
    EditArticlePopupComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    ButtonModule,
    ReactiveFormsModule,
    AccordionModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    FormsModule,
    RouterModule,
    DialogModule,
    InputTextareaModule
  ]
})
export class ArticlesModule { }
