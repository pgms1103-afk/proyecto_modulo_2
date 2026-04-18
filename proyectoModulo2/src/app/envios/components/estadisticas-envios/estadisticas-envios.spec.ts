import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEnvios } from './estadisticas-envios';

describe('EstadisticasEnvios', () => {
  let component: EstadisticasEnvios;
  let fixture: ComponentFixture<EstadisticasEnvios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticasEnvios],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasEnvios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
