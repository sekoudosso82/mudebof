import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addmember } from './addmember';

describe('Addmember', () => {
  let component: Addmember;
  let fixture: ComponentFixture<Addmember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addmember],
    }).compileComponents();

    fixture = TestBed.createComponent(Addmember);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
