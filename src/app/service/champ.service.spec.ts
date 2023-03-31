import { TestBed } from '@angular/core/testing';

import { ChampService } from './champ.service';

describe('ChampService', () => {
  let service: ChampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
