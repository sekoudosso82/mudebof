import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authinterceptor } from '../authinterceptor';

describe('Authinterceptor', () => {
  let component: Authinterceptor;
  let fixture: ComponentFixture<Authinterceptor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authinterceptor],
    }).compileComponents();

    fixture = TestBed.createComponent(Authinterceptor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
