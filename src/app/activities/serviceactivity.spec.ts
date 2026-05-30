import { TestBed } from '@angular/core/testing';

import { Serviceactivity } from './serviceactivity';

describe('Serviceactivity', () => {
  let service: Serviceactivity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviceactivity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
