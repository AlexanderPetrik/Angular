import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call'
})
export class CallPipe implements PipeTransform {

  transform(age: number): string {
    switch(true) {
      case age < 10:
        return 'child';
      case age < 20:
        return 'young';
      case age < 60:
        return 'adult';
      default:
        return 'old';
    }
  }
}
