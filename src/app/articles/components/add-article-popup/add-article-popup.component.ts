import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ControllerService} from "../../../shared/api/endpoints/services/controller.service";
import {MessageService} from "primeng/api";
import {ArticleModel} from "../../../shared/api/endpoints/models/article-model";

@Component({
  selector: 'app-add-article-popup',
  templateUrl: './add-article-popup.component.html',
  styleUrls: ['./add-article-popup.component.sass']
})
export class AddArticlePopupComponent implements OnInit {
  insertForm: FormGroup;
  @Input() isVisible;
  @Input() selectedIndex;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newArticle: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>();
  constructor(
    private formBuilder: FormBuilder,
    private controllerService: ControllerService,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  initForm() {
    this.insertForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      url: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      published: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.insertForm.reset();
    this.isVisibleChange.emit(false);
  }

  processArticleInsertion() {
    if (this.insertForm.valid) {
      const newArticle: ArticleModel = {
        author: this.insertForm.controls.author.value,
        title: this.insertForm.controls.title.value,
        url: this.insertForm.controls.url.value,
        content: this.insertForm.controls.content.value,
        category: this.insertForm.controls.category.value,
        published: this.insertForm.controls.published.value
      }
      console.log(this.insertForm.controls.published.value);
      this.controllerService.addArticle({indexName: this.selectedIndex, body: newArticle}).toPromise().then(
        response => {
          if (response) {
            newArticle.downloadDate = new Date().toDateString();
            this.isVisibleChange.emit(false);
            this.newArticle.emit(newArticle);
            this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful added article!'});
          }
        }
      );
    }
  }
}
