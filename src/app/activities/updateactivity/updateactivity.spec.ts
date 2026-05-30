import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateactivity } from './updateactivity';

describe('Updateactivity', () => {
  let component: Updateactivity;
  let fixture: ComponentFixture<Updateactivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateactivity],
    }).compileComponents();

    fixture = TestBed.createComponent(Updateactivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
