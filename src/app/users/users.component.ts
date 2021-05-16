import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SortService } from '../core/sort.service';

export interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  // addUserForm: Omit<User, 'id'> = {
  //   name: '',
  //   age: null,
  //   gender: 'unknown',
  //   email: '',
  // }
  addUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sortService: SortService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.initAddUserForm();
  }

  getUsers() {
    this.http
      .get<User[]>('api/users')
      .subscribe(users => this.filteredUsers = this.users = users);
  }

  addUser() {
    console.log(this.addUserForm);
    console.log(this.addUserForm.value);
    if(this.addUserForm.invalid) {
      Object.values(this.addUserForm.controls).forEach(control => control.markAsTouched());
    } else {
      this.http
        .post('api/users', this.addUserForm.value)
        .subscribe(() => this.getUsers());
    }
  }

  deleteUser(user: User) {
    this.http
      .delete(`api/users/${user.id}`)
      .subscribe(() => this.getUsers());
  }

  filterUsers(gender: string) {
    this.filteredUsers = this.users.filter(user => user.gender === gender || gender === 'All');
  }

  sortUsers() {
    this.filteredUsers = this.sortService.sortArr(this.filteredUsers, 'age', 'number', 'desk');
  }

  // Создаем и иницализируем Реактивную форму

  initAddUserForm() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.max(100)]],
      gender: ['unknown', null],
      email: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  getField(fieldName: string) {
    return this.addUserForm.controls[fieldName];
  }
}

