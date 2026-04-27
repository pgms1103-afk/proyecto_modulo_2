import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { Subject, of, throwError }   from 'rxjs';
import { HttpResponse }              from '@angular/common/http';
import { ToastrService }             from 'ngx-toastr';

import { TablaTrabajadores }  from './tabla-trabajadores';
import { TrabajadorService }  from '../../../services/trabajador.service';
import { TrabajadorModel }    from '../../../models/trabajor.model';


const makeTrab = (overrides: Partial<TrabajadorModel> = {}): TrabajadorModel => ({
  id: 1, nombre: 'Carlos Pérez', cedula: 111, telefono: 300,
  email: 'c@t.com', cargo: 'Conductor', ...overrides,
});

const mockLista: TrabajadorModel[] = [
  makeTrab({ id: 1, cargo: 'Conductor' }),
  makeTrab({ id: 2, nombre: 'Ana Gómez',   cargo: 'Administrador' }),
  makeTrab({ id: 3, nombre: 'Luis Torres', cargo: 'Manipulador' }),
];


describe('TablaTrabajadores', () => {
  let component : TablaTrabajadores;
  let fixture   : ComponentFixture<TablaTrabajadores>;

  let refrescarSubject  : Subject<void>;
  let filtroSubject     : Subject<string>;
  let listaSubject      : Subject<TrabajadorModel[]>;

  let serviceSpy : jasmine.SpyObj<TrabajadorService>;
  let toastrSpy  : jasmine.SpyObj<ToastrService>;


  beforeEach(async () => {
    refrescarSubject = new Subject<void>();
    filtroSubject    = new Subject<string>();
    listaSubject     = new Subject<TrabajadorModel[]>();

    serviceSpy = jasmine.createSpyObj(
      'TrabajadorService',
      ['getTrabajadores', 'deleteTrabajadores', 'notificarRefresco'],
      {
        refrescarTabla$    : refrescarSubject.asObservable(),
        cargoFiltro$       : filtroSubject.asObservable(),
        listaTrabajadores$ : listaSubject.asObservable(),
      },
    );

    serviceSpy.getTrabajadores.and.returnValue(
      of(new HttpResponse<TrabajadorModel[]>({ body: mockLista, status: 200 })),
    );
    serviceSpy.deleteTrabajadores.and.returnValue(of('OK'));

    // ✅ CORRECCIÓN: toastrSpy se crea ANTES de configurar el TestBed
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [TablaTrabajadores],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TrabajadorService, useValue: serviceSpy },
        // ✅ CORRECCIÓN: ToastrService se provee en el TestBed para que inject() lo resuelva
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(TablaTrabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('ngOnInit – llama a getTrabajadores() al iniciar', () => {
    expect(serviceSpy.getTrabajadores).toHaveBeenCalledTimes(1);
  });

  it('loadOperaciones() – popula trabajadores desde respuesta array', () => {
    component.trabajadores = [];
    component.loadOperaciones();
    expect(component.trabajadores).toEqual(mockLista);
    expect(component.statuscode).toBe(200);
  });

  it('loadOperaciones() – popula trabajadores desde respuesta con propiedad data', () => {
    serviceSpy.getTrabajadores.and.returnValue(
      of(new HttpResponse<any>({ body: { data: mockLista }, status: 200 })),
    );
    component.loadOperaciones();
    expect(component.trabajadores).toEqual(mockLista);
  });

  it('loadOperaciones() – asigna lista vacía cuando body es null', () => {
    serviceSpy.getTrabajadores.and.returnValue(
      of(new HttpResponse<any>({ body: null, status: 200 })),
    );
    component.loadOperaciones();
    expect(component.trabajadores).toEqual([]);
  });

  it('loadOperaciones() – maneja error HTTP y muestra toastr', () => {
    serviceSpy.getTrabajadores.and.returnValue(
      throwError(() => ({ status: 500 })),
    );
    component.loadOperaciones();
    expect(component.trabajadores).toEqual([]);
    expect(toastrSpy.error).toHaveBeenCalled();
  });


  it('refrescarTabla$ – al emitir, vuelve a llamar loadOperaciones()', () => {
    const spy = spyOn(component, 'loadOperaciones').and.callThrough();
    refrescarSubject.next();
    expect(spy).toHaveBeenCalled();
  });

  it('cargoFiltro$ – actualiza cargoSeleccionado', () => {
    filtroSubject.next('Conductor');
    expect(component.cargoSeleccionado).toBe('Conductor');
  });

  it('listaTrabajadores$ – actualiza la lista de trabajadores', () => {
    const nueva = [makeTrab({ id: 99, nombre: 'Nuevo' })];
    listaSubject.next(nueva);
    expect(component.trabajadores).toEqual(nueva);
  });


  it('trabajadoresFiltrados – devuelve todos cuando cargo es ""', () => {
    component.trabajadores    = mockLista;
    component.cargoSeleccionado = '';
    expect(component.trabajadoresFiltrados.length).toBe(3);
  });

  it('trabajadoresFiltrados – devuelve todos cuando cargo es "todos"', () => {
    component.trabajadores    = mockLista;
    component.cargoSeleccionado = 'todos';
    expect(component.trabajadoresFiltrados.length).toBe(3);
  });

  it('trabajadoresFiltrados – filtra correctamente por "Conductor"', () => {
    component.trabajadores    = mockLista;
    component.cargoSeleccionado = 'Conductor';
    const res = component.trabajadoresFiltrados;
    expect(res.length).toBe(1);
    expect(res[0].cargo).toBe('Conductor');
  });

  it('trabajadoresFiltrados – devuelve [] si ninguno coincide', () => {
    component.trabajadores    = mockLista;
    component.cargoSeleccionado = 'Vigilante';
    expect(component.trabajadoresFiltrados.length).toBe(0);
  });


  it('deleteTrabajador() – llama al servicio con el id correcto', () => {
    component.deleteTrabajador(1);
    expect(serviceSpy.deleteTrabajadores).toHaveBeenCalledWith(1);
  });

  it('deleteTrabajador() exitoso – muestra toastr de éxito y recarga', () => {
    component.deleteTrabajador(1);
    expect(toastrSpy.success).toHaveBeenCalledWith('Trabajador eliminado');
    expect(serviceSpy.getTrabajadores).toHaveBeenCalled();
  });

  it('deleteTrabajador() con error – muestra toastr de error', () => {
    serviceSpy.deleteTrabajadores.and.returnValue(
      throwError(() => ({ error: 'Error del servidor' })),
    );
    component.deleteTrabajador(99);
    expect(toastrSpy.error).toHaveBeenCalledWith('Error del servidor');
  });


  it('abrirEditar() – asigna copia del trabajador y muestra modal', () => {
    const t = makeTrab();
    component.abrirEditar(t);
    expect(component.trabajadorSeleccionado).toEqual(t);
    expect(component.modalEditarVisible).toBeTrue();
  });

  it('abrirEditar() – crea una copia independiente del objeto', () => {
    const t = makeTrab();
    component.abrirEditar(t);
    expect(component.trabajadorSeleccionado).not.toBe(t);
  });

  it('cerrarEditar() – oculta modal y limpia trabajadorSeleccionado', () => {
    component.abrirEditar(makeTrab());
    component.cerrarEditar();
    expect(component.modalEditarVisible).toBeFalse();
    expect(component.trabajadorSeleccionado).toBeNull();
  });


  it('notificarEditar() – emite el EventEmitter clicEditar', () => {
    let emitido = false;
    component.clicEditar.subscribe(() => (emitido = true));
    component.notificarEditar();
    expect(emitido).toBeTrue();
  });


  it('ngOnDestroy() – se ejecuta sin lanzar errores', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
