import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailmember } from './detailmember';

describe('Detailmember', () => {
  let component: Detailmember;
  let fixture: ComponentFixture<Detailmember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailmember],
    }).compileComponents();

    fixture = TestBed.createComponent(Detailmember);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
