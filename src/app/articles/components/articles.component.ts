import { Component, OnInit } from '@angular/core';
import {QueryResultModel} from "../../shared/api/endpoints/models/query-result-model";
import {ControllerService} from "../../shared/api/endpoints/services/controller.service";
import {ArticleModel} from "../../shared/api/endpoints/models/article-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {
  queryResultModel: QueryResultModel
  editedArticle: ArticleModel;
  showArticlePopup = false;

  constructor(
    private controllerService: ControllerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  indexing($event: boolean) {

  }

  isIndexed($event: boolean) {

  }

  indexCleared() {

  }

  getArticles() {
    this.controllerService.getArticles().pipe().subscribe(res => {
      if (res) {
        this.queryResultModel = res;
      }
    })
  }

  editArticle($event: MouseEvent,  article: ArticleModel) {
    $event.stopPropagation();
    this.editedArticle = article;
    this.showArticlePopup = true;
  }

  deleteArticle($event: MouseEvent, article: ArticleModel) {
    this.controllerService.deleteArticle({id: article.id}).toPromise();
    this.queryResultModel.articles = this.queryResultModel.articles.filter(art => art.id !== article.id);
    this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful deleted article!'});
  }

}
