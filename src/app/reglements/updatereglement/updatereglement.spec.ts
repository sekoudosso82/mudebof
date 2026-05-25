import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatereglement } from './updatereglement';

describe('Updatereglement', () => {
  let component: Updatereglement;
  let fixture: ComponentFixture<Updatereglement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatereglement],
    }).compileComponents();

    fixture = TestBed.createComponent(Updatereglement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
