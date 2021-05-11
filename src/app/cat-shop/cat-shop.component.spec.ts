/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatShopComponent } from './cat-shop.component';

describe('CatShopComponent', () => {
  let component: CatShopComponent;
  let fixture: ComponentFixture<CatShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
