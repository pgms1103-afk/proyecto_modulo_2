import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizadorEnvios } from './actualizador-envios';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { EnvioModel } from '../../../models/envio.model';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ActualizadorEnvios', () => {
  let component: ActualizadorEnvios;
  let fixture: ComponentFixture<ActualizadorEnvios>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const envioMock: EnvioModel = {
    id: 1,
    tipoPaquete: 'Alimenticio',
    descripcion: 'Paquete inicial',
    peso: 10,
    direccionDestino: 'Carrera 1',
    costo: 50000,
    fechaEnvio: '2025-01-01T08:00',
    fechaEntrega: '2025-01-02T08:00',
    entregaATiempo: true
  };

  beforeEach(async () => {
    envioServiceSpy = jasmine.createSpyObj('EnvioService', ['putActualizarEnvio', 'notificarRefresco']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ActualizadorEnvios],
      imports: [FormsModule],
      providers: [
        { provide: EnvioService, useValue: envioServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorEnvios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges: debe cargar los datos del envío en los campos del formulario', () => {
    component.envio = envioMock;
    component.ngOnChanges();

    expect(component.tipoPaquete).toBe(envioMock.tipoPaquete);
    expect(component.descripcion).toBe(envioMock.descripcion);
    expect(component.destino).toBe(envioMock.direccionDestino);
  });

  it('actualizarEnvio: debe llamar al servicio con los datos del formulario y refrescar', () => {
    component.envio = envioMock;
    component.ngOnChanges();

    component.descripcion = 'Descripción editada';

    envioServiceSpy.putActualizarEnvio.and.returnValue(of('OK'));
    spyOn(component, 'cerrar');

    component.actualizarEnvio();

    expect(envioServiceSpy.putActualizarEnvio).toHaveBeenCalledWith(
      envioMock.id,
      envioMock.tipoPaquete,
      'Descripción editada',
      component.peso,
      component.destino,
      component.fechaEnvio,
      component.fechaEntrega
    );
    expect(toastrSpy.success).toHaveBeenCalledWith('Envío actualizado correctamente', 'Éxito');
    expect(envioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('actualizarEnvio: debe mostrar error si el servicio falla', () => {
    component.envio = envioMock;
    const errorMsg = 'Error de servidor';
    envioServiceSpy.putActualizarEnvio.and.returnValue(throwError(() => ({ error: errorMsg })));

    component.actualizarEnvio();

    expect(toastrSpy.error).toHaveBeenCalledWith(errorMsg, 'Error');
  });

  it('actualizarTipo: debe actualizar solo el tipo manteniendo los otros datos originales del envío', () => {
    component.envio = envioMock;
    component.tipoPaquete = 'Carta';

    envioServiceSpy.putActualizarEnvio.and.returnValue(of('OK'));
    spyOn(component, 'cerrar');

    component.actualizarTipo();

    expect(envioServiceSpy.putActualizarEnvio).toHaveBeenCalledWith(
      envioMock.id,
      'Carta',
      envioMock.descripcion,
      envioMock.peso,
      envioMock.direccionDestino,
      envioMock.fechaEnvio,
      envioMock.fechaEntrega
    );
    expect(toastrSpy.success).toHaveBeenCalledWith('Tipo de paquete actualizado correctamente', 'Éxito');
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('cerrar: debe emitir el evento alCerrar', () => {
    spyOn(component.alCerrar, 'emit');
    component.cerrar();
    expect(component.alCerrar.emit).toHaveBeenCalled();
  });

  it('actualizarEnvio: no debe hacer nada si this.envio es null', () => {
    component.envio = null;
    component.actualizarEnvio();
    expect(envioServiceSpy.putActualizarEnvio).not.toHaveBeenCalled();
  });
});
