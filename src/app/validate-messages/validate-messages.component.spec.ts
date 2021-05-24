import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateMessagesComponent } from './validate-messages.component';

describe('ValidateMessagesComponent', () => {
  let component: ValidateMessagesComponent;
  let fixture: ComponentFixture<ValidateMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
