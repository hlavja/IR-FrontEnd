import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControllerService} from "../../api/endpoints/services/controller.service";
import {tap} from "rxjs/operators";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit, OnDestroy {

  indexes = ['myData', 'trecData'];
  interval;
  isIndexed: String[] = [];
  isSaved: String[] = [];
  @Output() emitIndexing: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitIndexed: EventEmitter<String[]> = new EventEmitter<String[]>();
  @Output() emitClearIndex: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isIndex;
  constructor(
    private controllerService: ControllerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getIndexStatus();
    this.getSavedIndex();
    this.interval = setInterval(()=>{
      this.getIndexStatus();
      this.getSavedIndex();
    }, 10000);
  }

  getIndexStatus() {
    this.controllerService.checkIndexStatus().pipe(
      tap(response => {
        this.isIndexed = [];
        response.forEach(value => {
          if (value.initialized && !this.isIndexed.includes(value.indexName)) {
            this.isIndexed.push(value.indexName);
            this.emitIndexed.emit(this.isIndexed);
            if (!value.initialized) {
              this.emitClearIndex.emit();
            }
          }
        })
      })
    ).subscribe();
  }


  getSavedIndex() {
    this.controllerService.checkSavedIndexState().pipe(
      tap(response => {
        this.isSaved = [];
        response.forEach(value => {
          if (value.saved && !this.isSaved.includes(value.indexName)) {
            this.isSaved.push(value.indexName);
          }
        })
      })
    ).subscribe();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  initIndex() {
    console.log('start indexing');
    this.emitIndexing.emit(true);
    this.controllerService.initData$Response().pipe(
    ).subscribe(res => {
      if (res) {
        console.log('completed');
        if (!this.isIndexed.includes('myData')) {
          this.isIndexed.push('myData');
        }
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful indexed CRYPTO data!'});
        this.emitIndexing.emit(false);
        this.emitIndexed.emit(this.isIndexed);
      }
    });
  }

  initTrec() {
    console.log('start indexing');
    this.emitIndexing.emit(true);
    this.controllerService.initTrecData$Response().pipe(
    ).subscribe(res => {
      if (res) {
        console.log('completed');
        if (!this.isIndexed.includes('trecData')) {
          this.isIndexed.push('trecData');
        }
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful indexed TREC data!'});
        this.emitIndexing.emit(false);
        this.emitIndexed.emit(this.isIndexed);
      }
    });

  }

  saveIndex(indexName) {
    this.emitIndexing.emit(true);
    this.controllerService.saveIndex$Response({fileName: indexName}).pipe().subscribe(res => {
      if (res.status === 200) {
        if (!this.isSaved.includes(indexName)) {
          this.isSaved.push(indexName);
        }
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful save index!'});
        this.emitIndexing.emit(false);
      } else {
        this.messageService.add({key: 'mainToast', severity:'error', summary: 'Error!', detail: 'Wrong request!'});
      }
    });
  }

  loadIndex(indexName) {
    this.emitIndexing.emit(true);
    this.controllerService.loadIndex$Response({fileName: indexName}).pipe().subscribe(res => {
      if (res.status === 200) {
        console.log('completed');
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful loaded index!'});
        if (!this.isIndexed.includes(indexName)) {
          this.isIndexed.push(indexName);
        }
        this.emitIndexed.emit(this.isIndexed);
        this.emitIndexing.emit(false);
      } else {
        this.messageService.add({key: 'mainToast', severity:'error', summary: 'Error!', detail: 'Wrong request!'});
      }
    });
  }

  clearIndex() {
    this.controllerService.clearIndex().toPromise().then();
    this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful cleared index!'});
    this.isIndexed = [];
    this.emitIndexed.emit(this.isIndexed);
    this.emitClearIndex.emit();
  }
}
