import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentMariosComponent } from './sent-marios.component';

describe('SentMariosComponent', () => {
  let component: SentMariosComponent;
  let fixture: ComponentFixture<SentMariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentMariosComponent]
    });
    fixture = TestBed.createComponent(SentMariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
