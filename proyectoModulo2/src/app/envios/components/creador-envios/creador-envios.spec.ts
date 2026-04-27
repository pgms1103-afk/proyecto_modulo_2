import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadorEnvios } from './creador-envios';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CreadorEnvios', () => {
  let component: CreadorEnvios;
  let fixture: ComponentFixture<CreadorEnvios>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    envioServiceSpy = jasmine.createSpyObj('EnvioService', [
      'postCrearEnvio',
      'notificarRefresco',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [CreadorEnvios],
      providers: [
        { provide: EnvioService, useValue: envioServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreadorEnvios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar tipoPaquete con "Alimenticio"', () => {
    expect(component.tipoPaquete).toBe('Alimenticio');
  });

  it('debe inicializar los demás campos vacíos o en cero', () => {
    expect(component.descripcion).toBe('');
    expect(component.destino).toBe('');
    expect(component.peso).toBe(0);
  });

  it('crearEnvio: llama al servicio con las fechas con segundos añadidos', () => {
    component.tipoPaquete  = 'Carta';
    component.descripcion  = 'Prueba';
    component.peso         = 1;
    component.destino      = 'Bogotá';
    component.fechaEnvio   = '2025-04-01T08:00';
    component.fechaEntrega = '2025-04-03T08:00';

    envioServiceSpy.postCrearEnvio.and.returnValue(of('OK'));

    component.crearEnvio();

    expect(envioServiceSpy.postCrearEnvio).toHaveBeenCalledWith(
      'Carta',
      'Prueba',
      1,
      'Bogotá',
      '2025-04-01T08:00:00',
      '2025-04-03T08:00:00'
    );
  });

  it('crearEnvio: en éxito muestra toastr success y notifica refresco', () => {
    envioServiceSpy.postCrearEnvio.and.returnValue(of('Creado'));
    spyOn(component, 'cerrar');

    component.crearEnvio();

    expect(toastrSpy.success).toHaveBeenCalled();
    expect(envioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('crearEnvio: en error muestra toastr error', () => {
    envioServiceSpy.postCrearEnvio.and.returnValue(
      throwError(() => ({ error: 'Datos inválidos' }))
    );

    component.crearEnvio();

    expect(toastrSpy.error).toHaveBeenCalledWith('Datos inválidos', 'Error de creación');
  });

  it('cerrar: debe emitir el evento alCerrar', () => {
    spyOn(component.alCerrar, 'emit');
    component.cerrar();
    expect(component.alCerrar.emit).toHaveBeenCalled();
  });

  it('@Input esVisible: acepta valor true', () => {
    component.esVisible = true;
    fixture.detectChanges();
    expect(component.esVisible).toBeTrue();
  });
});
