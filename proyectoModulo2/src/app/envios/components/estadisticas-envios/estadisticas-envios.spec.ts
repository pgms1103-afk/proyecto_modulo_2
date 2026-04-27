import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasEnvios } from './estadisticas-envios';
import { EnvioService } from '../../../services/envio.service';
import { ChangeDetectorRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { EnvioModel } from '../../../models/envio.model';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideToastr } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EstadisticasEnvios', () => {
  let component: EstadisticasEnvios;
  let fixture: ComponentFixture<EstadisticasEnvios>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;

  const enviosMock: EnvioModel[] = [
    { id: 1, tipoPaquete: 'Alimenticio', descripcion: 'A', peso: 1, direccionDestino: 'X', costo: 1000, fechaEnvio: '', fechaEntrega: '', entregaATiempo: true },
    { id: 2, tipoPaquete: 'Alimenticio', descripcion: 'B', peso: 2, direccionDestino: 'Y', costo: 2000, fechaEnvio: '', fechaEntrega: '', entregaATiempo: false },
    { id: 3, tipoPaquete: 'No Alimenticio', descripcion: 'C', peso: 3, direccionDestino: 'Z', costo: 3000, fechaEnvio: '', fechaEntrega: '', entregaATiempo: true },
    { id: 4, tipoPaquete: 'Carta', descripcion: 'D', peso: 0.1, direccionDestino: 'W', costo: 500, fechaEnvio: '', fechaEntrega: '', entregaATiempo: false },
    { id: 5, tipoPaquete: 'Carta', descripcion: 'E', peso: 0.2, direccionDestino: 'V', costo: 600, fechaEnvio: '', fechaEntrega: '', entregaATiempo: true },
  ];

  beforeEach(async () => {
    envioServiceSpy = jasmine.createSpyObj('EnvioService', ['getEnvios'], {
      refrescarTabla$: of(),
    });

    envioServiceSpy.getEnvios.and.returnValue(
      of(new HttpResponse({ body: enviosMock, status: 200 }))
    );

    await TestBed.configureTestingModule({
      declarations: [EstadisticasEnvios],
      providers: [
        { provide: EnvioService, useValue: envioServiceSpy },
        ChangeDetectorRef,
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasEnvios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cargarDatos: debe cargar la lista de envíos desde el servicio', () => {
    expect(component.envios.length).toBe(5);
    expect(envioServiceSpy.getEnvios).toHaveBeenCalled();
  });

  it('cargarDatos: si el body tiene propiedad "data", la usa', () => {
    const respData = { data: enviosMock };
    envioServiceSpy.getEnvios.and.returnValue(
      of(new HttpResponse({ body: respData as any, status: 200 }))
    );
    component.cargarDatos();
    expect(component.envios).toEqual(enviosMock);
  });

  it('cargarDatos: en caso de error, deja la lista vacía', () => {
    envioServiceSpy.getEnvios.and.returnValue(throwError(() => new Error('Error HTTP')));
    component.cargarDatos();
    expect(component.envios.length).toBe(0);
  });

  it('totalEnvios: debe retornar el total de envíos', () => {
    expect(component.totalEnvios).toBe(5);
  });

  it('totalAlimenticios: debe contar solo los Alimenticios', () => {
    expect(component.totalAlimenticios).toBe(2);
  });

  it('totalNoAlimenticios: debe contar solo los No Alimenticios', () => {
    expect(component.totalNoAlimenticios).toBe(1);
  });

  it('totalCartas: debe contar solo las Cartas', () => {
    expect(component.totalCartas).toBe(2);
  });

  it('totalATiempo: debe contar los entregados a tiempo', () => {
    expect(component.totalATiempo).toBe(3);
  });

  it('totalConRetraso: debe contar los entregados con retraso', () => {
    expect(component.totalConRetraso).toBe(2);
  });

  it('totalEnvios: debe ser 0 cuando no hay envíos', () => {
    component.envios = [];
    expect(component.totalEnvios).toBe(0);
    expect(component.totalAlimenticios).toBe(0);
    expect(component.totalATiempo).toBe(0);
  });

  it('ngOnDestroy: debe cancelar la suscripción al destruirse', () => {
    if ((component as any).sub) {
      spyOn((component as any).sub, 'unsubscribe');
      component.ngOnDestroy();
      expect((component as any).sub.unsubscribe).toHaveBeenCalled();
    }
  });
});
