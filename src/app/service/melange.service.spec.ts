import { TestBed } from '@angular/core/testing';

import { MelangeService } from './melange.service';

describe('MelangeService', () => {
  let service: MelangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MelangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
