import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorEnvios } from './buscador-envios';

describe('BuscadorEnvios', () => {
  let component: BuscadorEnvios;
  let fixture: ComponentFixture<BuscadorEnvios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscadorEnvios],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorEnvios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
