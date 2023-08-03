import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedMariosComponent } from './received-marios.component';

describe('ReceivedMariosComponent', () => {
  let component: ReceivedMariosComponent;
  let fixture: ComponentFixture<ReceivedMariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedMariosComponent]
    });
    fixture = TestBed.createComponent(ReceivedMariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
