import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailactivity } from './detailactivity';

describe('Detailactivity', () => {
  let component: Detailactivity;
  let fixture: ComponentFixture<Detailactivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailactivity],
    }).compileComponents();

    fixture = TestBed.createComponent(Detailactivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
