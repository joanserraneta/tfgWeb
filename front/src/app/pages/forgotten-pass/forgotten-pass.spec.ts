import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPass } from './forgotten-pass';

describe('ForgottenPass', () => {
  let component: ForgottenPass;
  let fixture: ComponentFixture<ForgottenPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgottenPass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottenPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
