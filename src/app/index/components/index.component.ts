import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ControllerService} from "../../shared/api/endpoints/services/controller.service";
import {QueryModel} from "../../shared/api/endpoints/models/query-model";
import {QueryResultModel} from "../../shared/api/endpoints/models/query-result-model";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  searchForm: FormGroup;
  queryModel: QueryModel;
  queryResultModel: QueryResultModel
  loading = false;
  stateOptions: any[] = [{label: 'VECTOR', value: 'true'}, {label: 'BOOLEAN', value: 'false'}];
  value = 'true';
  indexed = false;
  groups: string[] = ['10','20','30'];
  indexInMemory: String[] = [];
  selectedOption = 'Select index';
  searchTerms: String[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private controllerService: ControllerService
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: ['', [Validators.required]],
      groups: ['5', Validators.required]
    });
  }

  search() {
    if (this.selectedOption === 'Select index'){
      return;
    }
    if (this.searchForm.valid) {
      this.loading = true;
      this.queryModel = {
        query: this.searchForm.controls.searchText.value,
        vectorModel: this.value === 'true',
        numberOfResults: this.searchForm.controls.groups.value,
        indexName: this.selectedOption
      };
      this.searchTerms = this.getSearchWords(this.searchForm.controls.searchText.value);
      this.controllerService.search({body: this.queryModel}).subscribe(
        response => {
          this.queryResultModel = response;
          this.loading = false;
        }
      );
    }
  }

  indexing($event: any) {
    this.queryResultModel = null;
    this.loading = $event;
  }

  isIndexed($event: any) {
    this.indexed = true;
    this.indexInMemory = $event;
  }

  indexCleared() {
    this.selectedOption = 'Select index';
    this.indexed = false;
    this.queryResultModel = null;
  }

  getSearchWords(searchString: String) {
    searchString = searchString.replace('(', '').replace(')', '').replace('AND', '').replace('OR', '');
    let array = searchString.split(' ');
    array = array.filter(value1 => value1 !== '');
    array = array.filter(val => val !== 'AND');
    array = array.filter(val => val !== 'OR');
    array = array.filter(val => val !== 'NOT');
    array = array.filter(val => val !== '(');
    array = array.filter(val => val !== ')');
/*    while (array.indexOf('NOT') > 0) {
      array.forEach((value1, index) => {
        if (value1 === 'NOT') {
          array.splice(index, 2);
        }
      });
      console.log(array);
    }*/
    return array;
  }
}
