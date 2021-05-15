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

  interval;
  isIndexed = false;
  isSaved = false;
  @Output() emitIndexing: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitIndexed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        this.isIndexed = response.initialized;
        this.emitIndexed.emit(response.initialized);
        if (!response.initialized) {
          this.emitClearIndex.emit();
        }
      })
    ).subscribe();
  }


  getSavedIndex() {
    this.controllerService.checkSavedIndexState().pipe(
      tap(response => {
        this.isSaved = response.saved;
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
        this.isIndexed = true;
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful indexed CRYPTO data!'});
        this.emitIndexing.emit(false);
        this.emitIndexed.emit(true);
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
        this.isIndexed = true;
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful indexed TREC data!'});
        this.emitIndexing.emit(false);
        this.emitIndexed.emit(true);
      }
    });

  }

  saveIndex() {
    this.emitIndexing.emit(true);
    this.controllerService.saveIndex$Response({fileName: 'index'}).pipe().subscribe(res => {
      if (res.status === 200) {
        console.log('completed');
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful save index!'});
        this.emitIndexing.emit(false);
      } else {
        this.messageService.add({key: 'mainToast', severity:'error', summary: 'Error!', detail: 'Wrong request!'});
      }
    });
  }

  loadIndex() {
    this.emitIndexing.emit(true);
    this.controllerService.loadIndex$Response({fileName: 'index'}).pipe().subscribe(res => {
      if (res.status === 200) {
        console.log('completed');
        this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful loaded index!'});
        this.isIndexed = true;
        this.emitIndexed.emit(true);
        this.emitIndexing.emit(false);
      } else {
        this.messageService.add({key: 'mainToast', severity:'error', summary: 'Error!', detail: 'Wrong request!'});
      }
    });
  }

  clearIndex() {
    this.controllerService.clearIndex().toPromise().then();
    this.messageService.add({key: 'mainToast', severity:'success', summary: 'Success!', detail: 'Successful cleared index!'});
    this.isIndexed = false;
    this.emitIndexed.emit(false);
    this.emitClearIndex.emit();
  }
}
