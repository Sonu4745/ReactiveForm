import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractiveFormComponent } from './practive-form.component';

describe('PractiveFormComponent', () => {
  let component: PractiveFormComponent;
  let fixture: ComponentFixture<PractiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PractiveFormComponent]
    });
    fixture = TestBed.createComponent(PractiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
