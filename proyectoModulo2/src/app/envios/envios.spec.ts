import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Envios } from './envios';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Envios (Componente Principal)', () => {
  let component: Envios;
  let fixture: ComponentFixture<Envios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Envios],
      providers: [
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Envios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe iniciar con mostrarCreador en false', () => {
    expect(component.mostrarCreador).toBeFalse();
  });

  it('abrirCreador: debe cambiar mostrarCreador a true', () => {
    component.abrirCreador();
    expect(component.mostrarCreador).toBeTrue();
  });

  it('cerrarCreador: debe cambiar mostrarCreador a false', () => {
    component.mostrarCreador = true;
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
  });

  it('debe iniciar con mostrarActualizador en false', () => {
    expect(component.mostrarActualizador).toBeFalse();
  });

  it('abrirActualizador: debe cambiar mostrarActualizador a true', () => {
    component.abrirActualizador();
    expect(component.mostrarActualizador).toBeTrue();
  });

  it('cerrarActualizador: debe cambiar mostrarActualizador a false', () => {
    component.mostrarActualizador = true;
    component.cerrarActualizador();
    expect(component.mostrarActualizador).toBeFalse();
  });
});
