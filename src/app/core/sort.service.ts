import { Injectable } from '@angular/core';

type type = 'number'|'string';
type direction = 'asc'|'desk';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sortArr(arr: any[], field: string, type: type = 'string', direction: direction = 'asc'): any[] {
    return [...arr].sort((a, b) => {
      [a, b] = direction === 'asc' ? [a, b] : [b, a];
      if (type === 'string') {
        return a[field].localeCompare(b[field]);
      } else {
        return a[field] - b[field];
      }
    });
  }
}
