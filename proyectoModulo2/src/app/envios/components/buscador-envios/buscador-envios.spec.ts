import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorEnvios } from './buscador-envios';
import { EnvioService } from '../../../services/envio.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BuscadorEnvios', () => {
  let component: BuscadorEnvios;
  let fixture: ComponentFixture<BuscadorEnvios>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;

  beforeEach(async () => {
    envioServiceSpy = jasmine.createSpyObj('EnvioService', [
      'notificarRefresco',
      'filtrarPorTipo',
      'filtrarPorEstado',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BuscadorEnvios],
      providers: [
        { provide: EnvioService, useValue: envioServiceSpy },
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorEnvios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar tipoSeleccionado con "todos"', () => {
    expect(component.tipoSeleccionado).toBe('todos');
  });

  it('notificarNuevo: debe emitir el evento clicNuevo', () => {
    spyOn(component.clicNuevo, 'emit');
    component.notificarNuevo();
    expect(component.clicNuevo.emit).toHaveBeenCalled();
  });

  it('recargarTabla: debe llamar notificarRefresco del servicio', () => {
    component.recargarTabla();
    expect(envioServiceSpy.notificarRefresco).toHaveBeenCalled();
  });

  it('cambiarFiltro: debe llamar filtrarPorTipo con el tipo seleccionado', () => {
    component.tipoSeleccionado = 'Carta';
    component.cambiarFiltro();
    expect(envioServiceSpy.filtrarPorTipo).toHaveBeenCalledWith('Carta');
  });

  it('buscar: debe llamar filtrarPorEstado con el texto buscado', () => {
    component.textoBuscado = 'a tiempo';
    component.buscar();
    expect(envioServiceSpy.filtrarPorEstado).toHaveBeenCalledWith('a tiempo');
  });

  it('buscar: debe llamar filtrarPorEstado con cadena vacía si no hay texto', () => {
    component.textoBuscado = '';
    component.buscar();
    expect(envioServiceSpy.filtrarPorEstado).toHaveBeenCalledWith('');
  });
});
