import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntravauxComponent } from './entravaux.component';

describe('EntravauxComponent', () => {
  let component: EntravauxComponent;
  let fixture: ComponentFixture<EntravauxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntravauxComponent]
    });
    fixture = TestBed.createComponent(EntravauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
