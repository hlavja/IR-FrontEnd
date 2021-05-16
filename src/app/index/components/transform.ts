import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})

export class HighlightText implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    for(const text of args) {
      const reText = new RegExp(text, 'gi');
      value = value.replace(reText, "<mark>" + text + "</mark>");
    }
    return value;
  }
}
