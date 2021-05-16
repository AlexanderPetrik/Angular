import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatShopComponent } from './cat-shop/cat-shop.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    UsersComponent,
    CatShopComponent,
    TodoListComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'users', component: UsersComponent },
      { path: 'cats', component: CatsComponent},
      { path: 'cat-shop', component: CatShopComponent},
      { path: 'todo-list', component: TodoListComponent}
    ]),

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
