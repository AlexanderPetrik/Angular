import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Task {
  title: string;
  id?: number;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  showAddForm: boolean;
  addTaskForm: FormGroup;
  tasks: Task[] = [];
  completedTasks: Task[] = [];


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.initAddTackForm();
    this.getTasks();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  initAddTackForm() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  addTask() {
    if(this.addTaskForm.invalid) {
      Object.values(this.addTaskForm.controls).forEach(control => control.markAsTouched());
    } else {
      // this.tasks.push({...this.addTaskForm.value, completed: false});
      this.http
        .post('api/tasks', {...this.addTaskForm.value, completed: false})
        .subscribe(() => {
          this.getTasks();
          this.addTaskForm.reset();
        });
    }
  }

  removeTask(list: Task[], task: Task) {
    this.http
      .delete(`api/tasks/${task.id}`)
      .subscribe(() => this.getTasks());
    // list.splice(list.indexOf(task), 1);
  }

  completeTask(task: Task) {
    task.completed = true;
    this.http
      .put(`api/tasks/${task.id}`, task)
      .subscribe(()=> this.getTasks());
    // this.removeTask(this.tasks, task);
    // this.completedTasks.unshift(task);
  }

  activateTask(task: Task) {
    task.completed = false;
    this.http
      .put(`api/tasks/${task.id}`, task)
      .subscribe(()=> this.getTasks());
    // this.removeTask(this.completedTasks, task);
    // this.tasks.unshift(task);
  }

  getTasks() {
    this.http
      .get<Task[]>('api/tasks')
      .subscribe(tasks => {
        this.tasks = [];
        this.completedTasks = [];
        tasks.forEach(task => {
          if (task.completed) {
            this.completedTasks.push(task);
          } else {
            this.tasks.push(task);
          }
        })
      });
  }
}
