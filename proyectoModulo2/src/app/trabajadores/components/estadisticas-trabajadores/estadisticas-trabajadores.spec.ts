import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTrabajadores } from './estadisticas-trabajadores';

describe('EstadisticasTrabajadores', () => {
  let component: EstadisticasTrabajadores;
  let fixture: ComponentFixture<EstadisticasTrabajadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticasTrabajadores],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasTrabajadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
