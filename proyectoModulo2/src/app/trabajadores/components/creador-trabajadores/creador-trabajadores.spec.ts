import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { of, throwError }            from 'rxjs';
import { ToastrService }             from 'ngx-toastr';

import { CreadorTrabajadores } from './creador-trabajadores';
import { TrabajadorService }   from '../../../services/trabajador.service';


describe('CreadorTrabajadores', () => {
  let component : CreadorTrabajadores;
  let fixture   : ComponentFixture<CreadorTrabajadores>;
  let serviceSpy: jasmine.SpyObj<TrabajadorService>;
  let toastrSpy : jasmine.SpyObj<ToastrService>;


  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('TrabajadorService', [
      'postCrearTrabajadores',
      'notificarRefresco',
    ]);
    serviceSpy.postCrearTrabajadores.and.returnValue(of('OK'));

    // ✅ CORRECCIÓN: toastrSpy se crea ANTES de configurar el TestBed
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [CreadorTrabajadores],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TrabajadorService, useValue: serviceSpy },
        // ✅ CORRECCIÓN: ToastrService se provee en el TestBed para que inject() lo resuelva
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(CreadorTrabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('nombre inicia vacío', () => {
    expect(component.nombre).toBe('');
  });

  it('email inicia vacío', () => {
    expect(component.email).toBe('');
  });

  it('cargo inicia vacío', () => {
    expect(component.cargo).toBe('');
  });

  it('cedula inicia en 0', () => {
    expect(component.cedula).toBe(0);
  });

  it('telefono inicia en 0', () => {
    expect(component.telefono).toBe(0);
  });

  it('esVisible inicia en false', () => {
    expect(component.esVisible).toBeFalse();
  });


  it('crearTrabajador() – llama al servicio con los valores del formulario', () => {
    component.nombre   = 'Luis';
    component.cedula   = 999;
    component.telefono = 3001112233;
    component.email    = 'luis@test.com';
    component.cargo    = 'Conductor';

    component.crearTrabajador();

    expect(serviceSpy.postCrearTrabajadores).toHaveBeenCalledWith(
      'Luis', 999, 3001112233, 'luis@test.com', 'Conductor',
    );
  });

  it('crearTrabajador() exitoso – muestra toastr de éxito', () => {
    component.crearTrabajador();
    expect(toastrSpy.success).toHaveBeenCalledWith('Trabajador creado con éxito', 'Éxito');
  });

  it('crearTrabajador() exitoso – llama a notificarRefresco()', () => {
    component.crearTrabajador();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
  });

  it('crearTrabajador() exitoso – emite el EventEmitter alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    component.crearTrabajador();
    expect(cerrado).toBeTrue();
  });


  it('crearTrabajador() con error – muestra toastr de error', () => {
    serviceSpy.postCrearTrabajadores.and.returnValue(
      throwError(() => ({ error: 'Cédula duplicada' })),
    );
    component.crearTrabajador();
    expect(toastrSpy.error).toHaveBeenCalledWith('Cédula duplicada', 'Error de creación');
  });

  it('crearTrabajador() con error – NO emite alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    serviceSpy.postCrearTrabajadores.and.returnValue(
      throwError(() => ({ error: 'Error' })),
    );
    component.crearTrabajador();
    expect(cerrado).toBeFalse();
  });


  it('cerrar() – emite el EventEmitter alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    component.cerrar();
    expect(cerrado).toBeTrue();
  });
});
