import { TestBed } from '@angular/core/testing';

import { SingleService } from './single.service';

describe('SingleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleService = TestBed.get(SingleService);
    expect(service).toBeTruthy();
  });
});
