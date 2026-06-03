import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detailreglement } from './detailreglement';

describe('Detailreglement', () => {
  let component: Detailreglement;
  let fixture: ComponentFixture<Detailreglement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detailreglement],
    }).compileComponents();

    fixture = TestBed.createComponent(Detailreglement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
