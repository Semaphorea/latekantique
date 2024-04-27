import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionslegalesComponent } from './mentionslegales.component';

describe('MentionslegalesComponent', () => {
  let component: MentionslegalesComponent;
  let fixture: ComponentFixture<MentionslegalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionslegalesComponent]
    });
    fixture = TestBed.createComponent(MentionslegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
