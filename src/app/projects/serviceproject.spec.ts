import { TestBed } from '@angular/core/testing';

import { Serviceproject } from './serviceproject';

describe('Serviceproject', () => {
  let service: Serviceproject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviceproject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
