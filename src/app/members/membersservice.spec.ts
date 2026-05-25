import { TestBed } from '@angular/core/testing';

import { Membersservice } from './membersservice';

describe('Membersservice', () => {
  let service: Membersservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Membersservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
