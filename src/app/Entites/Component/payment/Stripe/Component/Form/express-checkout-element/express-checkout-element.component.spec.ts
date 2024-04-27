import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressCheckoutElementComponent } from './express-checkout-element.component';

describe('ExpressCheckoutElementComponent', () => {
  let component: ExpressCheckoutElementComponent;
  let fixture: ComponentFixture<ExpressCheckoutElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpressCheckoutElementComponent]
    });
    fixture = TestBed.createComponent(ExpressCheckoutElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
