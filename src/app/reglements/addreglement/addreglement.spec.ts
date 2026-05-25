import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addreglement } from './addreglement';

describe('Addreglement', () => {
  let component: Addreglement;
  let fixture: ComponentFixture<Addreglement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addreglement],
    }).compileComponents();

    fixture = TestBed.createComponent(Addreglement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
