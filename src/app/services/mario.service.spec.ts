import { TestBed } from '@angular/core/testing';

import { MarioService } from './mario.service';

describe('MarioService', () => {
  let service: MarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
