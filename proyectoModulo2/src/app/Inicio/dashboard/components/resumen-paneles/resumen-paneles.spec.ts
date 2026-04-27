import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenPaneles } from './resumen-paneles';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioService } from '../../../../services/envio.service';
import { of, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ResumenPaneles', () => {
  let component: ResumenPaneles;
  let fixture: ComponentFixture<ResumenPaneles>;

  let trabajadorSpy: jasmine.SpyObj<TrabajadorService>;
  let usuarioSpy: jasmine.SpyObj<UsuarioService>;
  let envioSpy: jasmine.SpyObj<EnvioService>;

  const refrescarTrabajadores$ = new Subject<void>();
  const refrescarUsuarios$ = new Subject<void>();
  const refrescarEnvios$ = new Subject<void>();

  beforeEach(async () => {
    trabajadorSpy = jasmine.createSpyObj('TrabajadorService', ['getTrabajadores'], {
      refrescarTabla$: refrescarTrabajadores$.asObservable()
    });
    usuarioSpy = jasmine.createSpyObj('UsuarioService', ['getUsuarios'], {
      refrescarTabla$: refrescarUsuarios$.asObservable()
    });
    envioSpy = jasmine.createSpyObj('EnvioService', ['getEnvios'], {
      refrescarTabla$: refrescarEnvios$.asObservable()
    });

    trabajadorSpy.getTrabajadores.and.returnValue(of(new HttpResponse({ body: [] })));
    usuarioSpy.getUsuarios.and.returnValue(of(new HttpResponse({ body: [] })));
    envioSpy.getEnvios.and.returnValue(of(new HttpResponse({ body: [] })));

    await TestBed.configureTestingModule({
      declarations: [ResumenPaneles],
      providers: [
        { provide: TrabajadorService, useValue: trabajadorSpy },
        { provide: UsuarioService, useValue: usuarioSpy },
        { provide: EnvioService, useValue: envioSpy },
        ChangeDetectorRef
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenPaneles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe calcular correctamente los porcentajes de trabajadores', () => {
    component.trabajadores = [
      { id: 1, cargo: 'Administrador' } as any,
      { id: 2, cargo: 'Conductor' } as any,
      { id: 3, cargo: 'Conductor' } as any,
      { id: 4, cargo: 'Manipulador' } as any,
    ];

    expect(component.totalTrabajadores).toBe(4);
    expect(component.porcentajeAdmins).toBe(25);
    expect(component.porcentajeConductores).toBe(50);
  });


  it('debe calcular correctamente los totales de tipos de usuarios', () => {
    component.usuarios = [
      { id: 1, tipoUsuario: 'Admin' } as any,
      { id: 2, tipoUsuario: 'Normal' } as any,
      { id: 3, tipoUsuario: 'Premium' } as any,
      { id: 4, tipoUsuario: 'Concurrente' } as any,
    ];

    expect(component.totalUsuariosAdmins).toBe(1);
    expect(component.porcentajeUsuariosPremium).toBe(25);
  });


  it('debe calcular correctamente envíos a tiempo y retrasos', () => {
    component.envios = [
      { id: 1, tipoPaquete: 'Carta', entregaATiempo: true } as any,
      { id: 2, tipoPaquete: 'Carta', entregaATiempo: false } as any,
    ];

    expect(component.totalEnviosAtiempo).toBe(1);
    expect(component.porsentajeEnviosRetraso).toBe(50);
  });

  it('porsentajeEnviosRetraso: debe retornar 0 cuando no hay envíos (sin NaN)', () => {
    component.envios = [];
    expect(component.porsentajeEnviosRetraso).toBe(0);
  });


  it('debe volver a cargar trabajadores cuando el servicio notifica refresco', () => {
    refrescarTrabajadores$.next();
    expect(trabajadorSpy.getTrabajadores).toHaveBeenCalledTimes(2);
  });

  it('debe volver a cargar envíos cuando el servicio notifica refresco', () => {
    refrescarEnvios$.next();
    expect(envioSpy.getEnvios).toHaveBeenCalledTimes(2);
  });


  it('ngOnDestroy: debe desvincular las 3 suscripciones', () => {
    const subTrabajadores = spyOn((component as any).subTrabajadores, 'unsubscribe');
    const subUsuarios = spyOn((component as any).subUsuarios, 'unsubscribe');
    const subEnvios = spyOn((component as any).subEnvios, 'unsubscribe');

    component.ngOnDestroy();

    expect(subTrabajadores).toHaveBeenCalled();
    expect(subUsuarios).toHaveBeenCalled();
    expect(subEnvios).toHaveBeenCalled();
  });
});
