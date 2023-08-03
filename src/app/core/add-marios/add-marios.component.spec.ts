import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMariosComponent } from './add-marios.component';

describe('AddMariosComponent', () => {
  let component: AddMariosComponent;
  let fixture: ComponentFixture<AddMariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMariosComponent]
    });
    fixture = TestBed.createComponent(AddMariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
