import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

interface Task {
  title: string;
  id?: number;
  completed: boolean;
  order: number;
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
  showConfirmDialog: boolean;
  resolveRemove: Function;
  rejectRemove: Function;


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
      id: undefined,
      completed: false,
    });
  }

  saveTask() {
    if(this.addTaskForm.invalid) {
      Object.values(this.addTaskForm.controls).forEach(control => control.markAsTouched());
    } else if(!this.addTaskForm.value.id) {
      // this.tasks.push({...this.addTaskForm.value, completed: false});
      this.http
        .post('api/tasks', {...this.addTaskForm.value, order: this.tasks.length + 1})
        .subscribe(() => {
          this.getTasks();
          this.addTaskForm.reset({title: '', id: undefined, completed: false});
        })
    } else {
      this.http
        .put(`api/tasks/${this.addTaskForm.value.id}`, this.addTaskForm.value)
        .subscribe(()=> {
          this.getTasks();
          this.addTaskForm.reset({title: '', id: undefined, completed: false});
        })
    }
  }

  editTask(task: Task) {
    this.addTaskForm.setValue(task);
    this.showAddForm = true;
  }

  removeTask(list: Task[], task: Task) {
    this.showConfirmDialog = true;
    new Promise((resolve, reject) => {
      this.resolveRemove = resolve;
      this.rejectRemove = reject;
    }).then(() =>
      this.http
        .delete(`api/tasks/${task.id}`)
        .subscribe(() => this.getTasks())
    )
    // list.splice(list.indexOf(task), 1);
  }

  confirmRemove() {
    this.resolveRemove();
    this.showConfirmDialog = false;
  }

  cancelRemove() {
    this.rejectRemove();
    this.showConfirmDialog = false;
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
      .get<Task[]>('api/tasks?_sort=order&_order=asc')
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

  moveTask(task: Task, direction: 'up'|'down') {
    let swapTask: Task;
    if(direction === 'up') {
      const index = this.tasks.indexOf(task) - 1;
      swapTask = this.tasks[index];
      swapTask.order = task.order;
      task.order--;
    } else {
      const index = this.tasks.indexOf(task) + 1;
      swapTask = this.tasks[index];
      swapTask.order = task.order;
      task.order++;
    }
    combineLatest([
      this.http.put(`api/tasks/${task.id}`, task),
      this.http.put(`api/tasks/${swapTask.id}`, swapTask),
    ]).subscribe(()=> this.getTasks());
  }
}
