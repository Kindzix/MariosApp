import { TestBed } from '@angular/core/testing';

import { SentMarioService } from './sent-mario.service';

describe('SentMarioService', () => {
  let service: SentMarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentMarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
