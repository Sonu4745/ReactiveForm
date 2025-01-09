import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveLoginComponent } from './reactive-login.component';

describe('ReactiveLoginComponent', () => {
  let component: ReactiveLoginComponent;
  let fixture: ComponentFixture<ReactiveLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveLoginComponent]
    });
    fixture = TestBed.createComponent(ReactiveLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
