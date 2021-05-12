import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/components/index.component";
import {ArticlesComponent} from "./articles/components/articles.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },  {
    path: 'articles',
    component: ArticlesComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
