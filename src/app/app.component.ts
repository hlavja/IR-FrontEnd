import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><p-toast [baseZIndex]="20000" position="bottom-center" key="mainToast"></p-toast>'
})
export class AppComponent {
  title = 'IR';
}
