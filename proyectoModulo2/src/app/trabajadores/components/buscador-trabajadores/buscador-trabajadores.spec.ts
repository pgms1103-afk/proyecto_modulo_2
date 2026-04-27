import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { of }                        from 'rxjs';
import { HttpResponse }              from '@angular/common/http';

import { BuscadorTrabajadores } from './buscador-trabajadores';
import { TrabajadorService }    from '../../../services/trabajador.service';
import { TrabajadorModel }      from '../../../models/trabajor.model';

// ─── Datos ────────────────────────────────────────────────────────────────────

const mockResultado: TrabajadorModel[] = [
  { id: 1, nombre: 'Carlos Pérez', cedula: 111, telefono: 300, email: 'c@t.com', cargo: 'Conductor' },
];

// ─────────────────────────────────────────────────────────────────────────────

describe('BuscadorTrabajadores', () => {
  let component : BuscadorTrabajadores;
  let fixture   : ComponentFixture<BuscadorTrabajadores>;
  let serviceSpy: jasmine.SpyObj<TrabajadorService>;

  // ── Setup ──────────────────────────────────────────────────────────────────

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('TrabajadorService', [
      'notificarRefresco',
      'filtrarPorCargo',
      'actualizarTrabajadores',
      'buscarTrabajadorPorNombre',
    ]);

    serviceSpy.buscarTrabajadorPorNombre.and.returnValue(
      of(new HttpResponse<TrabajadorModel[]>({ body: mockResultado, status: 200 })),
    );

    await TestBed.configureTestingModule({
      declarations: [BuscadorTrabajadores],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TrabajadorService, useValue: serviceSpy },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(BuscadorTrabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creación ───────────────────────────────────────────────────────────────

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ── Estado inicial ─────────────────────────────────────────────────────────

  it('cargoSeleccionado inicia vacío', () => {
    expect(component.cargoSeleccionado).toBe('');
  });

  it('nombreBuscado inicia vacío', () => {
    expect(component.nombreBuscado).toBe('');
  });

  // ── notificarNuevo ─────────────────────────────────────────────────────────

  it('notificarNuevo() – emite el EventEmitter clicNuevo', () => {
    let emitido = false;
    component.clicNuevo.subscribe(() => (emitido = true));
    component.notificarNuevo();
    expect(emitido).toBeTrue();
  });

  // ── recargarTabla ──────────────────────────────────────────────────────────

  it('recargarTabla() – llama a notificarRefresco()', () => {
    component.recargarTabla();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
  });

  // ── cambiarFiltro ──────────────────────────────────────────────────────────

  it('cambiarFiltro() – llama a filtrarPorCargo con el cargo actual', () => {
    component.cargoSeleccionado = 'Administrador';
    component.cambiarFiltro();
    expect(serviceSpy.filtrarPorCargo).toHaveBeenCalledWith('Administrador');
  });

  it('cambiarFiltro() con cargo vacío – llama filtrarPorCargo con ""', () => {
    component.cargoSeleccionado = '';
    component.cambiarFiltro();
    expect(serviceSpy.filtrarPorCargo).toHaveBeenCalledWith('');
  });

  // ── buscarPorNombre – nombre vacío ─────────────────────────────────────────

  it('buscarPorNombre() con nombre vacío – llama a notificarRefresco()', () => {
    component.nombreBuscado = '';
    component.buscarPorNombre();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
    expect(serviceSpy.buscarTrabajadorPorNombre).not.toHaveBeenCalled();
  });

  it('buscarPorNombre() con solo espacios – llama a notificarRefresco()', () => {
    component.nombreBuscado = '   ';
    component.buscarPorNombre();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
    expect(serviceSpy.buscarTrabajadorPorNombre).not.toHaveBeenCalled();
  });

  // ── buscarPorNombre – con nombre válido ────────────────────────────────────

  it('buscarPorNombre() válido – llama al servicio HTTP con el nombre', () => {
    component.nombreBuscado = 'Carlos';
    component.buscarPorNombre();
    expect(serviceSpy.buscarTrabajadorPorNombre).toHaveBeenCalledWith('Carlos');
  });

  it('buscarPorNombre() – respuesta array plana llama a actualizarTrabajadores', () => {
    component.nombreBuscado = 'Carlos';
    component.buscarPorNombre();
    expect(serviceSpy.actualizarTrabajadores).toHaveBeenCalledWith(mockResultado);
  });

  it('buscarPorNombre() – respuesta con propiedad data llama a actualizarTrabajadores', () => {
    serviceSpy.buscarTrabajadorPorNombre.and.returnValue(
      of(new HttpResponse<any>({ body: { data: mockResultado }, status: 200 })),
    );
    component.nombreBuscado = 'Carlos';
    component.buscarPorNombre();
    expect(serviceSpy.actualizarTrabajadores).toHaveBeenCalledWith(mockResultado);
  });

  it('buscarPorNombre() – body null llama a actualizarTrabajadores con []', () => {
    serviceSpy.buscarTrabajadorPorNombre.and.returnValue(
      of(new HttpResponse<any>({ body: null, status: 200 })),
    );
    component.nombreBuscado = 'Carlos';
    component.buscarPorNombre();
    expect(serviceSpy.actualizarTrabajadores).toHaveBeenCalledWith([]);
  });
});
