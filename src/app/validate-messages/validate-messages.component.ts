import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-validate-messages',
  templateUrl: './validate-messages.component.html',
  styleUrls: ['./validate-messages.component.css']
})
export class ValidateMessagesComponent implements OnInit {

  @Input() control;

  constructor() { }

  ngOnInit(): void {
  }
}
