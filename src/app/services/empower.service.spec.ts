import { TestBed } from '@angular/core/testing';

import { EmpowerService } from './empower.service';

describe('EmpowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpowerService = TestBed.get(EmpowerService);
    expect(service).toBeTruthy();
  });
});
