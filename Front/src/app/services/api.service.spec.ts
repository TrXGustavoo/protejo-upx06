import { TestBed } from '@angular/core/testing';

import { EstagiarioService } from './api.service';

describe('EstagiarioService', () => {
  let service: EstagiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstagiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
