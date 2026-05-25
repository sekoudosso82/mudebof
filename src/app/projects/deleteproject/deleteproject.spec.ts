import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteproject } from './deleteproject';

describe('Deleteproject', () => {
  let component: Deleteproject;
  let fixture: ComponentFixture<Deleteproject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteproject],
    }).compileComponents();

    fixture = TestBed.createComponent(Deleteproject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
