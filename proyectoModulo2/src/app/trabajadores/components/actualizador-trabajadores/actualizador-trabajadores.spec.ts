import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { of, throwError }            from 'rxjs';
import { ToastrService }             from 'ngx-toastr';

import { ActualizadorTrabajadores } from './actualizador-trabajadores';
import { TrabajadorService }        from '../../../services/trabajador.service';
import { TrabajadorModel }          from '../../../models/trabajor.model';


const mockTrabajador: TrabajadorModel = {
  id: 5,
  nombre: 'Sofía Ruiz',
  cedula: 77777,
  telefono: 3209998877,
  email: 'sofia@test.com',
  cargo: 'Administrador',
};


describe('ActualizadorTrabajadores', () => {
  let component : ActualizadorTrabajadores;
  let fixture   : ComponentFixture<ActualizadorTrabajadores>;
  let serviceSpy: jasmine.SpyObj<TrabajadorService>;
  let toastrSpy : jasmine.SpyObj<ToastrService>;


  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('TrabajadorService', [
      'putActualizarTrabajador',
      'putActualizarCargo',
      'notificarRefresco',
    ]);
    serviceSpy.putActualizarTrabajador.and.returnValue(of('OK'));
    serviceSpy.putActualizarCargo.and.returnValue(of('OK'));

    // ✅ CORRECCIÓN: toastrSpy se crea ANTES de configurar el TestBed
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ActualizadorTrabajadores],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TrabajadorService, useValue: serviceSpy },
        // ✅ CORRECCIÓN: ToastrService se provee en el TestBed para que inject() lo resuelva
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ActualizadorTrabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('trabajador inicia en null', () => {
    expect(component.trabajador).toBeNull();
  });

  it('esVisible inicia en false', () => {
    expect(component.esVisible).toBeFalse();
  });

  it('nombre inicia vacío', () => {
    expect(component.nombre).toBe('');
  });

  it('email inicia vacío', () => {
    expect(component.email).toBe('');
  });


  it('ngOnChanges() – copia todos los campos del trabajador recibido', () => {
    component.trabajador = mockTrabajador;
    component.ngOnChanges();
    expect(component.nombre).toBe(mockTrabajador.nombre);
    expect(component.cedula).toBe(mockTrabajador.cedula);
    expect(component.telefono).toBe(mockTrabajador.telefono);
    expect(component.email).toBe(mockTrabajador.email);
    expect(component.cargo).toBe(mockTrabajador.cargo);
  });

  it('ngOnChanges() – no lanza error cuando trabajador es null', () => {
    component.trabajador = null;
    expect(() => component.ngOnChanges()).not.toThrow();
  });

  it('ngOnChanges() – no sobreescribe campos cuando trabajador es null', () => {
    component.nombre     = 'Previo';
    component.trabajador = null;
    component.ngOnChanges();
    expect(component.nombre).toBe('Previo');
  });


  it('actualizarTrabajador() – llama al servicio con los parámetros correctos', () => {
    component.trabajador = mockTrabajador;
    component.nombre     = 'Sofía Editada';
    component.cedula     = 88888;
    component.telefono   = 3110001122;
    component.email      = 'sofia2@test.com';
    component.cargo      = 'Conductor';

    component.actualizarTrabajador();

    expect(serviceSpy.putActualizarTrabajador).toHaveBeenCalledWith(
      5, 'Sofía Editada', 88888, 3110001122, 'sofia2@test.com', 'Conductor',
    );
  });

  it('actualizarTrabajador() exitoso – muestra toastr de éxito', () => {
    component.trabajador = mockTrabajador;
    component.actualizarTrabajador();
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Trabajador actualizado correctamente', 'Éxito',
    );
  });

  it('actualizarTrabajador() exitoso – llama a notificarRefresco()', () => {
    component.trabajador = mockTrabajador;
    component.actualizarTrabajador();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
  });

  it('actualizarTrabajador() exitoso – emite el EventEmitter alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    component.trabajador = mockTrabajador;
    component.actualizarTrabajador();
    expect(cerrado).toBeTrue();
  });

  it('actualizarTrabajador() con error – muestra toastr de error', () => {
    serviceSpy.putActualizarTrabajador.and.returnValue(
      throwError(() => ({ error: 'Correo ya registrado' })),
    );
    component.trabajador = mockTrabajador;
    component.actualizarTrabajador();
    expect(toastrSpy.error).toHaveBeenCalledWith(
      'Correo ya registrado', 'Error al actualizar trabajador',
    );
  });


  it('actualizarCargo() – llama al servicio con id y cargo correctos', () => {
    component.trabajador = mockTrabajador;
    component.cargo      = 'Manipulador';
    component.actualizarCargo();
    expect(serviceSpy.putActualizarCargo).toHaveBeenCalledWith(5, 'Manipulador');
  });

  it('actualizarCargo() exitoso – muestra toastr de éxito', () => {
    component.trabajador = mockTrabajador;
    component.actualizarCargo();
    expect(toastrSpy.success).toHaveBeenCalledWith('Cargo actualizado correctamente', 'Éxito');
  });

  it('actualizarCargo() exitoso – llama a notificarRefresco()', () => {
    component.trabajador = mockTrabajador;
    component.actualizarCargo();
    expect(serviceSpy.notificarRefresco).toHaveBeenCalled();
  });

  it('actualizarCargo() exitoso – emite el EventEmitter alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    component.trabajador = mockTrabajador;
    component.actualizarCargo();
    expect(cerrado).toBeTrue();
  });

  it('actualizarCargo() con error – muestra toastr de error', () => {
    serviceSpy.putActualizarCargo.and.returnValue(
      throwError(() => ({ error: 'Cargo inválido' })),
    );
    component.trabajador = mockTrabajador;
    component.actualizarCargo();
    expect(toastrSpy.error).toHaveBeenCalledWith('Cargo inválido', 'Error al actualizar cargo');
  });


  it('cerrar() – emite el EventEmitter alCerrar', () => {
    let cerrado = false;
    component.alCerrar.subscribe(() => (cerrado = true));
    component.cerrar();
    expect(cerrado).toBeTrue();
  });
});
