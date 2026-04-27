import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaEnvios } from './tabla-envios';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService, provideToastr } from 'ngx-toastr';
import { of, throwError, Subject } from 'rxjs';
import { EnvioModel } from '../../../models/envio.model';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TablaEnvios', () => {
  let component: TablaEnvios;
  let fixture: ComponentFixture<TablaEnvios>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const refrescarTabla$ = new Subject<void>();
  const tipoFiltro$     = new Subject<string>();
  const listaEnvios$    = new Subject<EnvioModel[]>();
  const estadoFiltro$   = new Subject<string>();

  const enviosMock: EnvioModel[] = [
    { id: 1, tipoPaquete: 'Alimenticio',    descripcion: 'A', peso: 1,   direccionDestino: 'Calle 10', costo: 1000, fechaEnvio: '', fechaEntrega: '', entregaATiempo: true  },
    { id: 2, tipoPaquete: 'No Alimenticio', descripcion: 'B', peso: 2,   direccionDestino: 'Calle 20', costo: 2000, fechaEnvio: '', fechaEntrega: '', entregaATiempo: false },
    { id: 3, tipoPaquete: 'Carta',          descripcion: 'C', peso: 0.1, direccionDestino: 'Calle 30', costo: 500,  fechaEnvio: '', fechaEntrega: '', entregaATiempo: true  },
  ];

  beforeEach(async () => {
    envioServiceSpy = jasmine.createSpyObj('EnvioService', ['getEnvios', 'deleteEnvio'], {
      refrescarTabla$,
      tipoFiltro$,
      listaEnvios$,
      estadoFiltro$,
    });
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    envioServiceSpy.getEnvios.and.returnValue(
      of(new HttpResponse({ body: enviosMock, status: 200 }))
    );

    await TestBed.configureTestingModule({
      declarations: [TablaEnvios],
      providers: [
        { provide: EnvioService, useValue: envioServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        provideToastr(),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaEnvios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cargarEnvios: debe cargar envíos y guardar el status code', () => {
    expect(component.envios.length).toBe(3);
    expect(component.statuscode).toBe(200);
  });

  it('cargarEnvios: si body tiene "data", extrae esa propiedad', () => {
    const respData = { data: enviosMock };
    envioServiceSpy.getEnvios.and.returnValue(
      of(new HttpResponse({ body: respData as any, status: 200 }))
    );
    component.cargarEnvios();
    expect(component.envios).toEqual(enviosMock);
  });

  it('cargarEnvios: en caso de error, muestra toastr y deja lista vacía', () => {
    envioServiceSpy.getEnvios.and.returnValue(throwError(() => ({ status: 500 })));
    component.cargarEnvios();
    expect(component.envios.length).toBe(0);
    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('enviosFiltrados: sin filtros retorna todos los envíos', () => {
    component.tipoSeleccionado = '';
    component.textoBuscado     = '';
    expect(component.enviosFiltrados.length).toBe(3);
  });

  it('enviosFiltrados: filtra por tipoPaquete correctamente', () => {
    component.tipoSeleccionado = 'Alimenticio';
    component.textoBuscado     = '';
    expect(component.enviosFiltrados.length).toBe(1);
    expect(component.enviosFiltrados[0].tipoPaquete).toBe('Alimenticio');
  });

  it('enviosFiltrados: tipo "todos" no aplica filtro de tipo', () => {
    component.tipoSeleccionado = 'todos';
    component.textoBuscado     = '';
    expect(component.enviosFiltrados.length).toBe(3);
  });

  it('enviosFiltrados: filtra por texto en tipoPaquete', () => {
    component.tipoSeleccionado = '';
    component.textoBuscado     = 'carta';
    expect(component.enviosFiltrados.length).toBe(1);
  });

  it('enviosFiltrados: texto "a tiempo" muestra solo entregados a tiempo', () => {
    component.tipoSeleccionado = '';
    component.textoBuscado     = 'a tiempo';
    const resultados = component.enviosFiltrados;
    expect(resultados.every(e => e.entregaATiempo === true)).toBeTrue();
  });

  it('enviosFiltrados: texto "con retraso" muestra solo con retraso', () => {
    component.tipoSeleccionado = '';
    component.textoBuscado     = 'con retraso';
    const resultados = component.enviosFiltrados;
    expect(resultados.every(e => e.entregaATiempo === false)).toBeTrue();
  });

  it('enviosFiltrados: filtra por direccionDestino', () => {
    component.tipoSeleccionado = '';
    component.textoBuscado     = 'calle 20';
    expect(component.enviosFiltrados.length).toBe(1);
    expect(component.enviosFiltrados[0].id).toBe(2);
  });

  it('deleteEnvio: al eliminar correctamente muestra éxito y recarga', () => {
    envioServiceSpy.deleteEnvio.and.returnValue(of('OK'));
    component.deleteEnvio(1);
    expect(toastrSpy.success).toHaveBeenCalled();
    expect(envioServiceSpy.getEnvios).toHaveBeenCalledTimes(2);
  });

  it('deleteEnvio: en caso de error muestra toastr de error', () => {
    envioServiceSpy.deleteEnvio.and.returnValue(throwError(() => ({ error: 'No encontrado' })));
    component.deleteEnvio(99);
    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('abrirEditar: debe asignar el envío seleccionado y mostrar el modal', () => {
    component.abrirEditar(enviosMock[0]);
    expect(component.envioSeleccionado).toEqual(enviosMock[0]);
    expect(component.modalEditarVisible).toBeTrue();
  });

  it('cerrarEditar: debe limpiar envioSeleccionado y ocultar el modal', () => {
    component.abrirEditar(enviosMock[0]);
    component.cerrarEditar();
    expect(component.envioSeleccionado).toBeNull();
    expect(component.modalEditarVisible).toBeFalse();
  });

  it('debe actualizar tipoSeleccionado cuando tipoFiltro$ emite', () => {
    tipoFiltro$.next('Carta');
    expect(component.tipoSeleccionado).toBe('Carta');
  });

  it('debe actualizar envios cuando listaEnvios$ emite', () => {
    listaEnvios$.next([enviosMock[0]]);
    expect(component.envios.length).toBe(1);
  });

  it('debe actualizar textoBuscado cuando estadoFiltro$ emite', () => {
    estadoFiltro$.next('bogotá');
    expect(component.textoBuscado).toBe('bogotá');
  });

  it('debe recargar envíos cuando refrescarTabla$ emite', () => {
    refrescarTabla$.next();
    expect(envioServiceSpy.getEnvios).toHaveBeenCalledTimes(2);
  });

  it('notificarEditar: debe emitir el evento clicEditar', () => {
    spyOn(component.clicEditar, 'emit');
    component.notificarEditar();
    expect(component.clicEditar.emit).toHaveBeenCalled();
  });

  it('ngOnDestroy: debe cancelar todas las suscripciones', () => {
    const subNames = ['sub', 'subFiltro', 'subLista', 'subEstado'];
    subNames.forEach(name => {
      if ((component as any)[name]) {
        spyOn((component as any)[name], 'unsubscribe');
      }
    });

    component.ngOnDestroy();

    subNames.forEach(name => {
      if ((component as any)[name]) {
        expect((component as any)[name].unsubscribe).toHaveBeenCalled();
      }
    });
  });
});
