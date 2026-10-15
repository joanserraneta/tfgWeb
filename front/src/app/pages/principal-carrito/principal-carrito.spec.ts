import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalCarrito } from './principal-carrito';

describe('PrincipalCarrito', () => {
  let component: PrincipalCarrito;
  let fixture: ComponentFixture<PrincipalCarrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalCarrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalCarrito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
