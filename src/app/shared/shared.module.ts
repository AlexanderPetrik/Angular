import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDirective } from './directives/info.directive';
import { CallPipe } from './pipes/call.pipe';



@NgModule({
  declarations: [
    InfoDirective,
    CallPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InfoDirective,
    CallPipe,
  ]
})
export class SharedModule { }
