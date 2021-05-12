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
    if (this.searchForm.valid) {
      this.loading = true;
      this.queryModel = {
        query: this.searchForm.controls.searchText.value,
        vectorModel: this.value === 'true',
        numberOfResults: this.searchForm.controls.groups.value
      };
      this.controllerService.search({body: this.queryModel}).subscribe(
        response => {
          this.queryResultModel = response;
          this.loading = false;
        }
      );
    }
  }

  indexing($event: any) {
    console.log($event);
    this.queryResultModel = null;
    this.loading = $event;
  }

  isIndexed($event: any) {
    this.indexed = $event;
  }

  indexCleared() {
    this.indexed = false;
    this.queryResultModel = null;
  }
}
