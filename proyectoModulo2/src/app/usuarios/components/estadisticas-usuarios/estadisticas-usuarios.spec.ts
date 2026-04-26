import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasUsuarios } from './estadisticas-usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { of, throwError, Subject } from 'rxjs';
import { UsuarioModel } from '../../../models/usuario.model';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EstadisticasUsuarios', () => {
  let component: EstadisticasUsuarios;
  let fixture: ComponentFixture<EstadisticasUsuarios>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;

  const refrescarTabla$ = new Subject<void>();


  const usuariosMock: UsuarioModel[] = [
    { id: 1, cedula: 1001, nombre: 'Ana',    apellido: 'López',    correo: 'a@m.com', contrasena: '1', tipoUsuario: 'Admin',       tarifa: 0 },
    { id: 2, cedula: 1002, nombre: 'Juan',   apellido: 'Pérez',    correo: 'b@m.com', contrasena: '2', tipoUsuario: 'Admin',       tarifa: 0 },
    { id: 3, cedula: 1003, nombre: 'María',  apellido: 'Ruiz',     correo: 'c@m.com', contrasena: '3', tipoUsuario: 'Normal',      tarifa: 5000 },
    { id: 4, cedula: 1004, nombre: 'Luis',   apellido: 'Torres',   correo: 'd@m.com', contrasena: '4', tipoUsuario: 'Normal',      tarifa: 5000 },
    { id: 5, cedula: 1005, nombre: 'Sofía',  apellido: 'Martínez', correo: 'e@m.com', contrasena: '5', tipoUsuario: 'Premium',     tarifa: 10000 },
    { id: 6, cedula: 1006, nombre: 'Carlos', apellido: 'Gómez',    correo: 'f@m.com', contrasena: '6', tipoUsuario: 'Concurrente', tarifa: 8000 },
  ];

  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['getUsuarios'], {
      refrescarTabla$,
    });

    usuarioServiceSpy.getUsuarios.and.returnValue(
      of(new HttpResponse({ body: usuariosMock, status: 200 }))
    );

    await TestBed.configureTestingModule({
      declarations: [EstadisticasUsuarios],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('cargarDatos: debe cargar la lista de usuarios en ngOnInit', () => {
    expect(component.usuarios.length).toBe(6);
    expect(usuarioServiceSpy.getUsuarios).toHaveBeenCalled();
  });

  it('cargarDatos: si el body tiene propiedad "data", la usa', () => {
    const respData = { data: usuariosMock };
    usuarioServiceSpy.getUsuarios.and.returnValue(
      of(new HttpResponse({ body: respData as any, status: 200 }))
    );
    component.cargarDatos();
    expect(component.usuarios).toEqual(usuariosMock);
  });

  it('cargarDatos: en caso de error deja la lista vacía', () => {
    usuarioServiceSpy.getUsuarios.and.returnValue(throwError(() => new Error('HTTP Error')));
    component.cargarDatos();
    expect(component.usuarios.length).toBe(0);
  });

  it('debe recargar datos cuando refrescarTabla$ emite', () => {
    refrescarTabla$.next();
    expect(usuarioServiceSpy.getUsuarios).toHaveBeenCalledTimes(2); // ngOnInit + refresco
  });


  it('totalUsuarios: debe retornar el total correcto', () => {
    expect(component.totalUsuarios).toBe(6);
  });

  it('totalAdmins: debe contar solo los de tipo "Admin"', () => {
    expect(component.totalAdmins).toBe(2);
  });

  it('totalUsuariosNormal: debe contar solo los de tipo "Normal"', () => {
    expect(component.totalUsuariosNormal).toBe(2);
  });

  it('totalUsuariosPremium: debe contar solo los de tipo "Premium"', () => {
    expect(component.totalUsuariosPremium).toBe(1);
  });

  it('totalUsuariosConcurrentes: debe contar solo los de tipo "Concurrente"', () => {
    expect(component.totalUsuariosConcurrentes).toBe(1);
  });


  it('todos los getters deben retornar 0 cuando la lista está vacía', () => {
    component.usuarios = [];
    expect(component.totalUsuarios).toBe(0);
    expect(component.totalAdmins).toBe(0);
    expect(component.totalUsuariosNormal).toBe(0);
    expect(component.totalUsuariosPremium).toBe(0);
    expect(component.totalUsuariosConcurrentes).toBe(0);
  });

  it('la suma de todos los tipos debe ser igual al total', () => {
    const suma =
      component.totalAdmins +
      component.totalUsuariosNormal +
      component.totalUsuariosPremium +
      component.totalUsuariosConcurrentes;
    expect(suma).toBe(component.totalUsuarios);
  });


  it('ngOnDestroy: debe cancelar la suscripción', () => {
    spyOn(component['sub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['sub'].unsubscribe).toHaveBeenCalled();
  });
});
