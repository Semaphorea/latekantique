import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleDesVentesComponent } from './salle-des-ventes.component';
describe('SalleDesVentesComponent', () => {
  let component: SalleDesVentesComponent;
  let fixture: ComponentFixture<SalleDesVentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalleDesVentesComponent]
    });
    fixture = TestBed.createComponent(SalleDesVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
