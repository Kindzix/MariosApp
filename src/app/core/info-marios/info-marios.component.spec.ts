import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMariosComponent } from './info-marios.component';

describe('InfoMariosComponent', () => {
  let component: InfoMariosComponent;
  let fixture: ComponentFixture<InfoMariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMariosComponent]
    });
    fixture = TestBed.createComponent(InfoMariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
