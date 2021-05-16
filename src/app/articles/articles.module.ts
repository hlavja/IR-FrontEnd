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
import { AddArticlePopupComponent } from './components/add-article-popup/add-article-popup.component';
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    ArticlesComponent,
    EditArticlePopupComponent,
    AddArticlePopupComponent
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
        InputTextareaModule,
        CalendarModule
    ]
})
export class ArticlesModule { }
