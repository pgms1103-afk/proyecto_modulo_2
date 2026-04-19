import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizadorEnvios } from './actualizador-envios';

describe('ActualizadorEnvios', () => {
  let component: ActualizadorEnvios;
  let fixture: ComponentFixture<ActualizadorEnvios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizadorEnvios],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorEnvios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
