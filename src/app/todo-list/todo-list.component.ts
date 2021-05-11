import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  showAddForm: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
