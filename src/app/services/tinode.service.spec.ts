import { TestBed } from '@angular/core/testing';

import { TinodeService } from './tinode.service';

describe('TinodeService', () => {
  let service: TinodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
