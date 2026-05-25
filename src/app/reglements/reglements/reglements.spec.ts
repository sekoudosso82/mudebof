import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reglements } from './reglements';

describe('Reglements', () => {
  let component: Reglements;
  let fixture: ComponentFixture<Reglements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reglements],
    }).compileComponents();

    fixture = TestBed.createComponent(Reglements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
