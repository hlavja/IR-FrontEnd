import { Component, OnInit } from '@angular/core';
import {QueryResultModel} from "../../shared/api/endpoints/models/query-result-model";
import {ControllerService} from "../../shared/api/endpoints/services/controller.service";
import {ArticleModel} from "../../shared/api/endpoints/models/article-model";
import {MessageService} from "primeng/api";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {
  queryResultModel: QueryResultModel
  editedArticle: ArticleModel;
  showArticlePopup = false;
  indexInMemory: String[] = [];
  selectedOption = 'Select index';
  loading = false;

  constructor(
    private controllerService: ControllerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getIndexStatus();
  }

  getIndexStatus() {
    this.controllerService.checkIndexStatus().pipe(
      tap(response => {
        this.indexInMemory = [];
        response.forEach(value => {
          if (value.initialized && !this.indexInMemory.includes(value.indexName)) {
            this.indexInMemory.push(value.indexName);
          }
        });
      })
    ).subscribe();
  }

  indexing($event: boolean) {

  }

  isIndexed($event: String[]) {

  }

  indexCleared() {

  }

  insertArticle() {
    //TODO
  }

  getArticles() {
    this.loading = true;
    this.controllerService.getArticles({indexName: this.selectedOption}).pipe().subscribe(res => {
      if (res) {
        this.queryResultModel = res;
        this.loading = false;
      }
    })
  }

  editArticle($event: MouseEvent,  article: ArticleModel) {
    $event.stopPropagation();
    this.editedArticle = article;
    this.showArticlePopup = true;
  }

  deleteArticle($event: MouseEvent, article: ArticleModel) {
    this.controllerService.deleteArticle({id: article.id, indexName: this.selectedOption}).toPromise();
    this.queryResultModel.articles = this.queryResultModel.articles.filter(art => art.id !== article.id);
    this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful deleted article!'});
  }

}
