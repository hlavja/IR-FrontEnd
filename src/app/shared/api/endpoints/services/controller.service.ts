/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ArticleModel } from '../models/article-model';
import { IndexStatus } from '../models/index-status';
import { QueryModel } from '../models/query-model';
import { QueryResultModel } from '../models/query-result-model';

@Injectable({
  providedIn: 'root',
})
export class ControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getArticleById
   */
  static readonly GetArticleByIdPath = '/api/article/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<QueryResultModel>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.GetArticleByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QueryResultModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleById(params: {
    id: number;
  }): Observable<QueryResultModel> {

    return this.getArticleById$Response(params).pipe(
      map((r: StrictHttpResponse<QueryResultModel>) => r.body as QueryResultModel)
    );
  }

  /**
   * Path part for operation deleteArticle
   */
  static readonly DeleteArticlePath = '/api/article/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.DeleteArticlePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: {
    id: number;
  }): Observable<string> {

    return this.deleteArticle$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getArticles
   */
  static readonly GetArticlesPath = '/api/articles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles$Response(params?: {
  }): Observable<StrictHttpResponse<QueryResultModel>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.GetArticlesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QueryResultModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles(params?: {
  }): Observable<QueryResultModel> {

    return this.getArticles$Response(params).pipe(
      map((r: StrictHttpResponse<QueryResultModel>) => r.body as QueryResultModel)
    );
  }

  /**
   * Path part for operation initTrecData
   */
  static readonly InitTrecDataPath = '/api/initTrec';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initTrecData()` instead.
   *
   * This method doesn't expect any request body.
   */
  initTrecData$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.InitTrecDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `initTrecData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  initTrecData(params?: {
  }): Observable<string> {

    return this.initTrecData$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation clearIndex
   */
  static readonly ClearIndexPath = '/api/clearIndex';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clearIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearIndex$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.ClearIndexPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `clearIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearIndex(params?: {
  }): Observable<string> {

    return this.clearIndex$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation search
   */
  static readonly SearchPath = '/api/query';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  search$Response(params?: {
    body?: QueryModel
  }): Observable<StrictHttpResponse<QueryResultModel>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.SearchPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QueryResultModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  search(params?: {
    body?: QueryModel
  }): Observable<QueryResultModel> {

    return this.search$Response(params).pipe(
      map((r: StrictHttpResponse<QueryResultModel>) => r.body as QueryResultModel)
    );
  }

  /**
   * Path part for operation updateArticle
   */
  static readonly UpdateArticlePath = '/api/article';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle$Response(params?: {
    body?: ArticleModel
  }): Observable<StrictHttpResponse<ArticleModel>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.UpdateArticlePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ArticleModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle(params?: {
    body?: ArticleModel
  }): Observable<ArticleModel> {

    return this.updateArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleModel>) => r.body as ArticleModel)
    );
  }

  /**
   * Path part for operation loadIndex
   */
  static readonly LoadIndexPath = '/api/loadIndex';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadIndex$Response(params: {
    fileName: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.LoadIndexPath, 'get');
    if (params) {
      rb.query('fileName', params.fileName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadIndex(params: {
    fileName: string;
  }): Observable<string> {

    return this.loadIndex$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation checkIndexStatus
   */
  static readonly CheckIndexStatusPath = '/api/indexStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkIndexStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkIndexStatus$Response(params?: {
  }): Observable<StrictHttpResponse<IndexStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.CheckIndexStatusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IndexStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `checkIndexStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkIndexStatus(params?: {
  }): Observable<IndexStatus> {

    return this.checkIndexStatus$Response(params).pipe(
      map((r: StrictHttpResponse<IndexStatus>) => r.body as IndexStatus)
    );
  }

  /**
   * Path part for operation initData
   */
  static readonly InitDataPath = '/api/initData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `initData()` instead.
   *
   * This method doesn't expect any request body.
   */
  initData$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.InitDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `initData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  initData(params?: {
  }): Observable<string> {

    return this.initData$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation saveIndex
   */
  static readonly SaveIndexPath = '/api/saveIndex';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveIndex()` instead.
   *
   * This method doesn't expect any request body.
   */
  saveIndex$Response(params: {
    fileName: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ControllerService.SaveIndexPath, 'get');
    if (params) {
      rb.query('fileName', params.fileName, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveIndex$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  saveIndex(params: {
    fileName: string;
  }): Observable<string> {

    return this.saveIndex$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
