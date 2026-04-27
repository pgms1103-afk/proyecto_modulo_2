import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorUsuarios } from './buscador-usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { of } from 'rxjs';
import { UsuarioModel } from '../../../models/usuario.model';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BuscadorUsuarios', () => {
  let component: BuscadorUsuarios;
  let fixture: ComponentFixture<BuscadorUsuarios>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;

  const usuariosMock: UsuarioModel[] = [
    { id: 1, cedula: 1001, nombre: 'Ana',  apellido: 'López', correo: 'ana@mail.com', contrasena: '1234', tipoUsuario: 'Admin',  tarifa: 0 },
    { id: 2, cedula: 1002, nombre: 'Juan', apellido: 'Pérez', correo: 'j@mail.com',   contrasena: '5678', tipoUsuario: 'Normal', tarifa: 5000 },
  ];

  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', [
      'notificarRefresco',
      'filtrarPorTipo',
      'getBuscarPorNombre',
      'actualizarUsuarios',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BuscadorUsuarios],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe inicializar nombreBuscado como cadena vacía', () => {
    expect(component.nombreBuscado).toBe('');
  });

  it('debe inicializar usuarioSeleccionado como cadena vacía', () => {
    expect(component.usuarioSeleccionado).toBe('');
  });


  it('notificarNuevo: debe emitir el evento clicNuevo', () => {
    spyOn(component.clicNuevo, 'emit');
    component.notificarNuevo();
    expect(component.clicNuevo.emit).toHaveBeenCalled();
  });


  it('recargarTabla: debe llamar notificarRefresco del servicio', () => {
    component.recargarTabla();
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
  });


  it('cambiarFiltro: debe llamar filtrarPorTipo con el tipo seleccionado', () => {
    component.usuarioSeleccionado = 'Premium';
    component.cambiarFiltro();
    expect(usuarioServiceSpy.filtrarPorTipo).toHaveBeenCalledWith('Premium');
  });

  it('cambiarFiltro: debe llamar filtrarPorTipo con "todos"', () => {
    component.usuarioSeleccionado = 'todos';
    component.cambiarFiltro();
    expect(usuarioServiceSpy.filtrarPorTipo).toHaveBeenCalledWith('todos');
  });

  it('cambiarFiltro: debe llamar filtrarPorTipo con cadena vacía', () => {
    component.usuarioSeleccionado = '';
    component.cambiarFiltro();
    expect(usuarioServiceSpy.filtrarPorTipo).toHaveBeenCalledWith('');
  });


  it('buscarPorNombre: si nombreBuscado está vacío, llama notificarRefresco', () => {
    component.nombreBuscado = '';
    component.buscarPorNombre();
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(usuarioServiceSpy.getBuscarPorNombre).not.toHaveBeenCalled();
  });

  it('buscarPorNombre: si el nombre es solo espacios, llama notificarRefresco', () => {
    component.nombreBuscado = '   ';
    component.buscarPorNombre();
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(usuarioServiceSpy.getBuscarPorNombre).not.toHaveBeenCalled();
  });

  it('buscarPorNombre: con nombre válido llama al servicio y actualiza la lista (body array)', () => {
    usuarioServiceSpy.getBuscarPorNombre.and.returnValue(
      of(new HttpResponse({ body: [usuariosMock[0]], status: 200 }))
    );
    component.nombreBuscado = 'Ana';
    component.buscarPorNombre();
    expect(usuarioServiceSpy.getBuscarPorNombre).toHaveBeenCalledWith('Ana');
    expect(usuarioServiceSpy.actualizarUsuarios).toHaveBeenCalledWith([usuariosMock[0]]);
  });

  it('buscarPorNombre: con body.data extrae el array correctamente', () => {
    const respData = { data: usuariosMock };
    usuarioServiceSpy.getBuscarPorNombre.and.returnValue(
      of(new HttpResponse({ body: respData as any, status: 200 }))
    );
    component.nombreBuscado = 'Ana';
    component.buscarPorNombre();
    expect(usuarioServiceSpy.actualizarUsuarios).toHaveBeenCalledWith(usuariosMock);
  });

  it('buscarPorNombre: si body es null, actualiza con array vacío', () => {
    usuarioServiceSpy.getBuscarPorNombre.and.returnValue(
      of(new HttpResponse<UsuarioModel[]>({ body: null as unknown as UsuarioModel[], status: 200 }))
    );
    component.nombreBuscado = 'Inexistente';
    component.buscarPorNombre();
    expect(usuarioServiceSpy.actualizarUsuarios).toHaveBeenCalledWith([]);
  });
});
