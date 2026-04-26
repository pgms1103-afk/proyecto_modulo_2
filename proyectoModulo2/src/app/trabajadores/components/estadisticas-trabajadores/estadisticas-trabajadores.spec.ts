import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasTrabajadores } from './estadisticas-trabajadores';
import { TrabajadorService } from '../../../services/trabajador.service';
import { of, throwError, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TrabajadorModel } from '../../../models/trabajor.model';

describe('EstadisticasTrabajadores', () => {
  let component: EstadisticasTrabajadores;
  let fixture: ComponentFixture<EstadisticasTrabajadores>;
  let trabajadorServiceSpy: jasmine.SpyObj<TrabajadorService>;

  const refrescarTablaSubject = new Subject<void>();

  const trabajadoresMock: TrabajadorModel[] = [
    { id: 1, nombre: 'Juan', cargo: 'Administrador' } as TrabajadorModel,
    { id: 2, nombre: 'Pedro', cargo: 'Conductor' } as TrabajadorModel,
    { id: 3, nombre: 'Luis', cargo: 'Conductor' } as TrabajadorModel,
    { id: 4, nombre: 'Ana', cargo: 'Manipulador' } as TrabajadorModel,
  ];

  beforeEach(async () => {
    trabajadorServiceSpy = jasmine.createSpyObj('TrabajadorService', ['getTrabajadores'], {
      refrescarTabla$: refrescarTablaSubject.asObservable()
    });

    trabajadorServiceSpy.getTrabajadores.and.returnValue(
      of(new HttpResponse({ body: trabajadoresMock, status: 200 }))
    );

    await TestBed.configureTestingModule({
      declarations: [EstadisticasTrabajadores],
      providers: [
        { provide: TrabajadorService, useValue: trabajadorServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasTrabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cargarDatos: debe cargar la lista de trabajadores al iniciar', () => {
    expect(component.trabajadores.length).toBe(4);
    expect(trabajadorServiceSpy.getTrabajadores).toHaveBeenCalled();
  });

  it('cargarDatos: debe manejar respuesta con propiedad "data"', () => {
    const mockConData = { data: [trabajadoresMock[0]] };
    trabajadorServiceSpy.getTrabajadores.and.returnValue(
      of(new HttpResponse({ body: mockConData as any, status: 200 }))
    );

    component.cargarDatos();

    expect(component.trabajadores.length).toBe(1);
    expect(component.trabajadores[0].nombre).toBe('Juan');
  });

  it('cargarDatos: debe dejar la lista vacía si el servicio falla', () => {
    trabajadorServiceSpy.getTrabajadores.and.returnValue(throwError(() => new Error('Error')));

    component.cargarDatos();

    expect(component.trabajadores.length).toBe(0);
  });


  it('totalTrabajadores: debe retornar el largo del array', () => {
    expect(component.totalTrabajadores).toBe(4);
  });

  it('totalAdministradores: debe filtrar correctamente por cargo Administrador', () => {
    expect(component.totalAdministradores).toBe(1);
  });

  it('totalConductores: debe filtrar correctamente por cargo Conductor', () => {
    expect(component.totalConductores).toBe(2);
  });

  it('totalManipuladoresPaquetes: debe filtrar correctamente por cargo Manipulador', () => {
    expect(component.totalManipuladoresPaquetes).toBe(1);
  });


  it('debe refrescar los datos cuando refrescarTabla$ emite un valor', () => {
    component.trabajadores = [];
    refrescarTablaSubject.next();
    expect(trabajadorServiceSpy.getTrabajadores).toHaveBeenCalled();
    expect(component.trabajadores.length).toBe(4);
  });

  it('ngOnDestroy: debe desvincular la suscripción al destruirse', () => {
    const subscriptionSpy = spyOn((component as any).sub, 'unsubscribe');

    component.ngOnDestroy();

    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
