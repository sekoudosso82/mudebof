import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletereglement } from './deletereglement';

describe('Deletereglement', () => {
  let component: Deletereglement;
  let fixture: ComponentFixture<Deletereglement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletereglement],
    }).compileComponents();

    fixture = TestBed.createComponent(Deletereglement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
