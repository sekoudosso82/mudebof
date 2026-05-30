import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addactivity } from './addactivity';

describe('Addactivity', () => {
  let component: Addactivity;
  let fixture: ComponentFixture<Addactivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addactivity],
    }).compileComponents();

    fixture = TestBed.createComponent(Addactivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
