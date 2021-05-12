import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleModel} from "../../../shared/api/endpoints/models/article-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ControllerService} from "../../../shared/api/endpoints/services/controller.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-article-popup',
  templateUrl: './edit-article-popup.component.html',
  styleUrls: ['./edit-article-popup.component.sass']
})
export class EditArticlePopupComponent implements OnInit {

  insertForm: FormGroup;

  @Input() isVisible;
  @Input() articleModel: ArticleModel;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private controllerService: ControllerService,
    private messageService: MessageService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  processArticleEdition() {
    if (this.insertForm.valid) {
      this.articleModel.author = this.insertForm.controls.author.value;
      this.articleModel.title = this.insertForm.controls.title.value;
      this.articleModel.category = this.insertForm.controls.category.value;
      this.articleModel.content = this.insertForm.controls.content.value;
      this.controllerService.updateArticle({body: this.articleModel}).toPromise();
      this.isVisibleChange.emit(false);
      this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful edited article!'});
    }
  }

  close() {
    this.isVisibleChange.emit(false);
  }

  initForm() {
    this.insertForm = this.formBuilder.group({
      author: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });
    setTimeout(() => {
      this.insertForm.controls.author.setValue(this.articleModel.author);
      this.insertForm.controls.title.setValue(this.articleModel.title);
      this.insertForm.controls.content.setValue(this.articleModel.content);
      this.insertForm.controls.category.setValue(this.articleModel.category);
    }, 0);
  }

}
