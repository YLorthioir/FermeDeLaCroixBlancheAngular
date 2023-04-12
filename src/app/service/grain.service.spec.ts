import { TestBed } from '@angular/core/testing';

import { GrainService } from './grain.service';

describe('GrainService', () => {
  let service: GrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
