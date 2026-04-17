import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadisticasusuarios } from './estadisticas-usuarios';

describe('Estadisticasusuarios', () => {
  let component: Estadisticasusuarios;
  let fixture: ComponentFixture<Estadisticasusuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Estadisticasusuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(Estadisticasusuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
