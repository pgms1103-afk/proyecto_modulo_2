import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaUsuarios } from './tabla-usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError, Subject } from 'rxjs';
import { UsuarioModel } from '../../../models/usuario.model';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TablaUsuarios', () => {
  let component: TablaUsuarios;
  let fixture: ComponentFixture<TablaUsuarios>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  // Subjects para simular los observables del servicio
  const refrescarTabla$ = new Subject<void>();
  const listaUsuarios$  = new Subject<UsuarioModel[]>();
  const tipoFiltro$     = new Subject<string>();

  const usuariosMock: UsuarioModel[] = [
    { id: 1, cedula: 1001, nombre: 'Ana',   apellido: 'López',  correo: 'ana@mail.com',   contrasena: '1234', tipoUsuario: 'Admin',       tarifa: 0 },
    { id: 2, cedula: 1002, nombre: 'Juan',  apellido: 'Pérez',  correo: 'juan@mail.com',  contrasena: '5678', tipoUsuario: 'Normal',      tarifa: 5000 },
    { id: 3, cedula: 1003, nombre: 'María', apellido: 'Ruiz',   correo: 'maria@mail.com', contrasena: 'abcd', tipoUsuario: 'Premium',     tarifa: 10000 },
    { id: 4, cedula: 1004, nombre: 'Luis',  apellido: 'Torres', correo: 'luis@mail.com',  contrasena: 'wxyz', tipoUsuario: 'Concurrente', tarifa: 8000 },
  ];

  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['getUsuarios', 'deleteUsuarios'], {
      refrescarTabla$,
      listaUsuarios$,
      tipoFiltro$,
    });
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    usuarioServiceSpy.getUsuarios.and.returnValue(
      of(new HttpResponse({ body: usuariosMock, status: 200 }))
    );

    await TestBed.configureTestingModule({
      declarations: [TablaUsuarios],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        { provide: ToastrService,  useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges(); // dispara ngOnInit
  });

  // ── Creación ───────────────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── loadOperaciones ────────────────────────────────────────────────────────

  it('loadOperaciones: debe cargar usuarios y guardar el statuscode', () => {
    expect(component.usuarios.length).toBe(4);
    expect(component.statuscode).toBe(200);
  });

  it('loadOperaciones: si el body tiene propiedad "data", la extrae', () => {
    const respData = { data: usuariosMock };
    usuarioServiceSpy.getUsuarios.and.returnValue(
      of(new HttpResponse({ body: respData as any, status: 200 }))
    );
    component.loadOperaciones();
    expect(component.usuarios).toEqual(usuariosMock);
  });

  it('loadOperaciones: si el body no es array ni tiene "data", asigna []', () => {
    usuarioServiceSpy.getUsuarios.and.returnValue(
      of(new HttpResponse<UsuarioModel[]>({ body: null as unknown as UsuarioModel[], status: 200 }))
    );
    component.loadOperaciones();
    expect(component.usuarios.length).toBe(0);
  });

  it('loadOperaciones: en caso de error muestra toastr y deja lista vacía', () => {
    usuarioServiceSpy.getUsuarios.and.returnValue(throwError(() => ({ status: 500 })));
    component.loadOperaciones();
    expect(component.usuarios.length).toBe(0);
    expect(toastrSpy.error).toHaveBeenCalledWith('Error al cargar las operaciones', 'Error');
  });


  it('usuariosFiltrados: sin filtro devuelve todos los usuarios', () => {
    component.tipoUsuarioSeleccionado = '';
    expect(component.usuariosFiltrados.length).toBe(4);
  });

  it('usuariosFiltrados: con "todos" devuelve todos los usuarios', () => {
    component.tipoUsuarioSeleccionado = 'todos';
    expect(component.usuariosFiltrados.length).toBe(4);
  });

  it('usuariosFiltrados: filtra correctamente por "Admin"', () => {
    component.tipoUsuarioSeleccionado = 'Admin';
    const resultado = component.usuariosFiltrados;
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Ana');
  });

  it('usuariosFiltrados: filtra correctamente por "Normal"', () => {
    component.tipoUsuarioSeleccionado = 'Normal';
    const resultado = component.usuariosFiltrados;
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Juan');
  });

  it('usuariosFiltrados: filtra correctamente por "Premium"', () => {
    component.tipoUsuarioSeleccionado = 'Premium';
    expect(component.usuariosFiltrados.length).toBe(1);
    expect(component.usuariosFiltrados[0].nombre).toBe('María');
  });

  it('usuariosFiltrados: filtra correctamente por "Concurrente"', () => {
    component.tipoUsuarioSeleccionado = 'Concurrente';
    expect(component.usuariosFiltrados.length).toBe(1);
    expect(component.usuariosFiltrados[0].nombre).toBe('Luis');
  });

  it('usuariosFiltrados: devuelve [] si el tipo no coincide con ningún usuario', () => {
    component.tipoUsuarioSeleccionado = 'TipoInexistente';
    expect(component.usuariosFiltrados.length).toBe(0);
  });


  it('deleteUsuario: al eliminar correctamente muestra éxito y recarga', () => {
    usuarioServiceSpy.deleteUsuarios.and.returnValue(of('OK'));
    component.deleteUsuario(1);
    expect(toastrSpy.success).toHaveBeenCalledWith('Usuario eliminado');
    expect(usuarioServiceSpy.getUsuarios).toHaveBeenCalledTimes(2); // ngOnInit + recarga
  });

  it('deleteUsuario: en caso de error muestra toastr de error', () => {
    usuarioServiceSpy.deleteUsuarios.and.returnValue(
      throwError(() => ({ error: 'No encontrado' }))
    );
    component.deleteUsuario(99);
    expect(toastrSpy.error).toHaveBeenCalledWith('No encontrado');
  });


  it('abrirEditar: debe asignar el usuario seleccionado y mostrar el modal', () => {
    component.abrirEditar(usuariosMock[0]);
    expect(component.usuarioSeleccionado).toEqual(usuariosMock[0]);
    expect(component.modalEditarVisible).toBeTrue();
  });

  it('abrirEditar: hace una copia del objeto (no referencia directa)', () => {
    component.abrirEditar(usuariosMock[0]);
    // Modificar el original no debe afectar el seleccionado
    (usuariosMock[0] as any).nombre = 'Cambiado';
    expect(component.usuarioSeleccionado!.nombre).toBe('Ana');
    (usuariosMock[0] as any).nombre = 'Ana'; // restaurar
  });

  it('cerrarEditar: debe limpiar usuarioSeleccionado y ocultar el modal', () => {
    component.abrirEditar(usuariosMock[0]);
    component.cerrarEditar();
    expect(component.usuarioSeleccionado).toBeNull();
    expect(component.modalEditarVisible).toBeFalse();
  });


  it('notificarEditar: debe emitir el evento clicEditar', () => {
    spyOn(component.clicEditar, 'emit');
    component.notificarEditar();
    expect(component.clicEditar.emit).toHaveBeenCalled();
  });


  it('debe recargar usuarios cuando refrescarTabla$ emite', () => {
    refrescarTabla$.next();
    expect(usuarioServiceSpy.getUsuarios).toHaveBeenCalledTimes(2);
  });

  it('debe actualizar la lista cuando listaUsuarios$ emite', () => {
    listaUsuarios$.next([usuariosMock[0]]);
    expect(component.usuarios.length).toBe(1);
    expect(component.usuarios[0].nombre).toBe('Ana');
  });

  it('debe actualizar tipoUsuarioSeleccionado cuando tipoFiltro$ emite', () => {
    tipoFiltro$.next('Premium');
    expect(component.tipoUsuarioSeleccionado).toBe('Premium');
  });


  it('ngOnDestroy: debe cancelar las 3 suscripciones', () => {
    spyOn(component['sub'],        'unsubscribe');
    spyOn(component['subLista'],   'unsubscribe');
    spyOn(component['subFiltro'],  'unsubscribe');
    component.ngOnDestroy();
    expect(component['sub'].unsubscribe).toHaveBeenCalled();
    expect(component['subLista'].unsubscribe).toHaveBeenCalled();
    expect(component['subFiltro'].unsubscribe).toHaveBeenCalled();
  });
});
