import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  date: Date = new Date();
  title = 'ngTrain';
  activeIndex = 1;

  nextSlide() {
    this.activeIndex = this.activeIndex === 3 ? this.activeIndex = 1 : this.activeIndex + 1;
  }
}
