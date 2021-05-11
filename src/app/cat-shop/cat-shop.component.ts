import { Component, OnInit } from '@angular/core';
import { Cat } from '../cats/cats.component';
import { User } from '../users/users.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cat-shop',
  templateUrl: './cat-shop.component.html',
  styleUrls: ['./cat-shop.component.css']
})
export class CatShopComponent implements OnInit {

  users: User[] = [];
  cats: Cat[] = [];
  userId: number;
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getCats();
    this.getUsers();
  }

  getCats() {
    this.http
      .get<Cat[]>('/api/cats')
      .subscribe(cats => this.cats = cats);
  }

  getUsers() {
    this.http
      .get<User[]>('api/users')
      .subscribe(users => this.users = users);
  }

  getFreeCats(): Cat[] {
    return this.cats.filter(cat => !cat.ownerId);
  }

  addCatToUser(cat: Cat) {
    this.http
      .put(`api/cats/${cat.id}`, { ...cat, ownerId: +this.userId })
      .subscribe(arg => cat.ownerId = +this.userId);
  }

  getUserCats() {
    if(!this.userId) {
      return [];
    }
    return this.cats.filter(cat => +this.userId === cat.ownerId)
  }

  removeCatFromUser(cat: Cat) {
    this.http
      .put(`api/cats/${cat.id}`, { ...cat, ownerId: undefined})
      .subscribe(arg => cat.ownerId = undefined);
  }


}
