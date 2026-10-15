import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCompra } from './final-compra';

describe('FinalCompra', () => {
  let component: FinalCompra;
  let fixture: ComponentFixture<FinalCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
