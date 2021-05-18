/* tslint:disable */
/* eslint-disable */
import { ArticleModel } from './article-model';
export interface QueryResultModel {
  articles?: Array<ArticleModel>;
  documentsCount?: number;
  searchWords?: Array<string>;
}
