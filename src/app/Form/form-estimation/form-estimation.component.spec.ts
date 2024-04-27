import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstimationComponent } from './form-estimation.component';

describe('FormEstimationComponent', () => {
  let component: FormEstimationComponent;
  let fixture: ComponentFixture<FormEstimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEstimationComponent]
    });
    fixture = TestBed.createComponent(FormEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();     
  });
});
 