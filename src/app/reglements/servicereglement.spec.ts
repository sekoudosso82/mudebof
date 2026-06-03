import { TestBed } from '@angular/core/testing';

import { Servicereglement } from './servicereglement';

describe('Servicereglement', () => {
  let service: Servicereglement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicereglement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
