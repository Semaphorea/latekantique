import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementconfirmationComponent } from './paiementconfirmation.component';

describe('PaiementconfirmationComponent', () => {
  let component: PaiementconfirmationComponent;
  let fixture: ComponentFixture<PaiementconfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementconfirmationComponent]
    });
    fixture = TestBed.createComponent(PaiementconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
