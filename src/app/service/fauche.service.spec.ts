import { TestBed } from '@angular/core/testing';

import { FaucheService } from './fauche.service';

describe('FaucheService', () => {
  let service: FaucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
