import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTarjetas } from './resumen-tarjetas';

describe('ResumenTarjetas', () => {
  let component: ResumenTarjetas;
  let fixture: ComponentFixture<ResumenTarjetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenTarjetas],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenTarjetas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
