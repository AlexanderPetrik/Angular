import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface Cat {
  id: number;
  name: string;
  age: number;
  ownerId: number;
  // [key: string]: any;
}


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  // @Input() cats: Cat[];
  // @Output() delete: EventEmitter<Cat>;

  // constructor() {
  //   this.delete = new EventEmitter();
  // }

  // deleteCat(cat: Cat) {
  //   this.delete.emit(cat);
  // }

  cats: Cat[] = [];
  addCatForm: any = {
    name: '',
    age: null,
  }

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.getCats();
  }

  addCat(...fields) {
    if (fields.some(fld => fld.invalid)) {
      fields.forEach(fld => fld.control.markAsDirty());
    } else {
      this.http
        .post('api/cats', this.addCatForm)
        .subscribe(() => this.getCats());
    }
  }

  getCats() {
    this.http
      .get<Cat[]>('/api/cats')
      .subscribe(cats => this.cats = cats);
  }

  deleteCat(cat) {
    this.http
      .delete(`/api/cats/${cat.id}`)
      .subscribe(() => this.getCats());
  }
}
