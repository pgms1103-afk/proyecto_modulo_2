import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenTarjetas } from './resumen-tarjetas';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioService } from '../../../../services/envio.service';
import { of, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

describe('ResumenTarjetas', () => {
  let component: ResumenTarjetas;
  let fixture: ComponentFixture<ResumenTarjetas>;


  let trabajadorSpy: jasmine.SpyObj<TrabajadorService>;
  let usuarioSpy: jasmine.SpyObj<UsuarioService>;
  let envioSpy: jasmine.SpyObj<EnvioService>;


  const refrescarTrabajadores$ = new Subject<void>();
  const refrescarUsuarios$ = new Subject<void>();
  const refrescarEnvios$ = new Subject<void>();

  beforeEach(async () => {
    // Creamos los mocks de los servicios con sus métodos y observables
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
      declarations: [ResumenTarjetas],
      providers: [
        { provide: TrabajadorService, useValue: trabajadorSpy },
        { provide: UsuarioService, useValue: usuarioSpy },
        { provide: EnvioService, useValue: envioSpy },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenTarjetas);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe calcular correctamente el total de trabajadores', () => {
    component.trabajadores = [
      { id: 1, nombre: 'Emp 1' } as any,
      { id: 2, nombre: 'Emp 2' } as any
    ];
    expect(component.totalTrabajadores).toBe(2);
  });

  it('debe calcular correctamente el total de usuarios y de administradores', () => {
    component.usuarios = [
      { id: 1, tipoUsuario: 'Admin' } as any,
      { id: 2, tipoUsuario: 'Normal' } as any,
      { id: 3, tipoUsuario: 'Admin' } as any,
    ];
    expect(component.totalUsuarios).toBe(3);
    expect(component.totalAdmins).toBe(2);
  });

  it('debe calcular correctamente envíos totales, a tiempo y con retraso', () => {
    component.envios = [
      { id: 1, entregaATiempo: true } as any,
      { id: 2, entregaATiempo: false } as any,
      { id: 3, entregaATiempo: true } as any,
    ];
    expect(component.totalEnvios).toBe(3);
    expect(component.totalEnviosATiempo).toBe(2);
    expect(component.totalEnviosConRetraso).toBe(1);
  });


  it('debe llamar a cargarDatosUsuarios cuando el usuarioService notifica un refresco', () => {

    usuarioSpy.getUsuarios.calls.reset();

    refrescarUsuarios$.next();

    expect(usuarioSpy.getUsuarios).toHaveBeenCalled();
  });

  it('debe llamar a cargarDatosEnvios cuando el envioService notifica un refresco', () => {
    envioSpy.getEnvios.calls.reset();

    refrescarEnvios$.next();

    expect(envioSpy.getEnvios).toHaveBeenCalled();
  });


  it('ngOnDestroy: debe desvincular las suscripciones para evitar fugas de memoria', () => {
    // Usamos (component as any) para acceder a las propiedades privadas
    const spy1 = spyOn((component as any).subTrabajadores, 'unsubscribe');
    const spy2 = spyOn((component as any).subUsuarios, 'unsubscribe');
    const spy3 = spyOn((component as any).subEnvios, 'unsubscribe');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
