import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewcommandeComponent } from './overviewcommande.component';

describe('OverviewcommandeComponent', () => {
  let component: OverviewcommandeComponent;
  let fixture: ComponentFixture<OverviewcommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewcommandeComponent]
    });
    fixture = TestBed.createComponent(OverviewcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
