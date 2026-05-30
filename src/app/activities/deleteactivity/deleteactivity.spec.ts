import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteactivity } from './deleteactivity';

describe('Deleteactivity', () => {
  let component: Deleteactivity;
  let fixture: ComponentFixture<Deleteactivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteactivity],
    }).compileComponents();

    fixture = TestBed.createComponent(Deleteactivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
