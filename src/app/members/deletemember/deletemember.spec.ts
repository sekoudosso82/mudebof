import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletemember } from './deletemember';

describe('Deletemember', () => {
  let component: Deletemember;
  let fixture: ComponentFixture<Deletemember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletemember],
    }).compileComponents();

    fixture = TestBed.createComponent(Deletemember);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
