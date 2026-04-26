import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizadorUsuarios } from './actualizador-usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { UsuarioModel } from '../../../models/usuario.model';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

describe('ActualizadorUsuarios', () => {
  let component: ActualizadorUsuarios;
  let fixture: ComponentFixture<ActualizadorUsuarios>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const usuarioMock: UsuarioModel = {
    id: 1,
    cedula: 1001,
    nombre: 'Ana',
    apellido: 'López',
    correo: 'ana@mail.com',
    contrasena: 'secreta',
    tipoUsuario: 'Admin',
    tarifa: 0,
  };

  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', [
      'putActualizarUsuario',
      'putActualizarTipo',
      'notificarRefresco',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ActualizadorUsuarios],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        { provide: ToastrService,  useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('ngOnChanges: al recibir un usuario, carga sus datos en los campos', () => {
    component.usuario = usuarioMock;
    component.ngOnChanges();

    expect(component.cedula).toBe(1001);
    expect(component.nombre).toBe('Ana');
    expect(component.apellido).toBe('López');
    expect(component.correo).toBe('ana@mail.com');
  });

  it('ngOnChanges: la contraseña siempre se resetea a cadena vacía', () => {
    component.usuario = usuarioMock;
    component.ngOnChanges();
    expect(component.contrasena).toBe('');
  });

  it('ngOnChanges: si usuario es null, no modifica los campos', () => {
    component.nombre = 'Previo';
    component.usuario = null;
    component.ngOnChanges();
    expect(component.nombre).toBe('Previo');
  });

  it('ngOnChanges: al cambiar de usuario, actualiza todos los campos', () => {
    const otroUsuario: UsuarioModel = {
      id: 2, cedula: 2002, nombre: 'Juan', apellido: 'Pérez',
      correo: 'juan@mail.com', contrasena: 'pass', tipoUsuario: 'Normal', tarifa: 5000,
    };
    component.usuario = usuarioMock;
    component.ngOnChanges();
    component.usuario = otroUsuario;
    component.ngOnChanges();

    expect(component.nombre).toBe('Juan');
    expect(component.cedula).toBe(2002);
  });


  it('actualizarUsuario: llama al servicio con los parámetros correctos', () => {
    component.usuario    = usuarioMock;
    component.cedula     = 1001;
    component.nombre     = 'Ana Modificada';
    component.apellido   = 'López';
    component.correo     = 'ana@mail.com';
    component.contrasena = 'nueva123';

    usuarioServiceSpy.putActualizarUsuario.and.returnValue(of('Actualizado'));
    component.actualizarUsuario();

    expect(usuarioServiceSpy.putActualizarUsuario).toHaveBeenCalledWith(
      1, 1001, 'Ana Modificada', 'López', 'ana@mail.com', 'nueva123'
    );
  });

  it('actualizarUsuario: en éxito muestra success, notifica refresco y cierra', () => {
    component.usuario = usuarioMock;
    usuarioServiceSpy.putActualizarUsuario.and.returnValue(of('OK'));
    spyOn(component, 'cerrar');

    component.actualizarUsuario();

    expect(toastrSpy.success).toHaveBeenCalledWith('Usuario actualizado correctamente', 'Éxito');
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('actualizarUsuario: en error muestra toastr error y NO notifica refresco', () => {
    component.usuario = usuarioMock;
    usuarioServiceSpy.putActualizarUsuario.and.returnValue(
      throwError(() => ({ error: 'Datos inválidos' }))
    );

    component.actualizarUsuario();

    expect(toastrSpy.error).toHaveBeenCalledWith('Datos inválidos', 'Error al actualizar usuario');
    expect(usuarioServiceSpy.notificarRefresco).not.toHaveBeenCalled();
  });

  it('actualizarTipoUsuario: llama al servicio con el id y tipo correctos', () => {
    component.usuario      = usuarioMock;
    component.tipoUsuario  = 'Premium';

    usuarioServiceSpy.putActualizarTipo.and.returnValue(of('Tipo actualizado'));
    component.actualizarTipoUsuario();

    expect(usuarioServiceSpy.putActualizarTipo).toHaveBeenCalledWith(1, 'Premium');
  });

  it('actualizarTipoUsuario: en éxito muestra success, notifica refresco y cierra', () => {
    component.usuario     = usuarioMock;
    component.tipoUsuario = 'Normal';
    usuarioServiceSpy.putActualizarTipo.and.returnValue(of('OK'));
    spyOn(component, 'cerrar');

    component.actualizarTipoUsuario();

    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Tipo de usuario actualizado correctamente', 'Éxito'
    );
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('actualizarTipoUsuario: en error muestra toastr error y NO notifica refresco', () => {
    component.usuario     = usuarioMock;
    component.tipoUsuario = 'Concurrente';
    usuarioServiceSpy.putActualizarTipo.and.returnValue(
      throwError(() => ({ error: 'Error tipo' }))
    );

    component.actualizarTipoUsuario();

    expect(toastrSpy.error).toHaveBeenCalledWith('Error tipo', 'Error al actualizar tipo de usuario');
    expect(usuarioServiceSpy.notificarRefresco).not.toHaveBeenCalled();
  });


  it('cerrar: debe emitir el evento alCerrar', () => {
    spyOn(component.alCerrar, 'emit');
    component.cerrar();
    expect(component.alCerrar.emit).toHaveBeenCalled();
  });


  it('@Input esVisible: acepta true', () => {
    component.esVisible = true;
    fixture.detectChanges();
    expect(component.esVisible).toBeTrue();
  });

  it('@Input esVisible: valor por defecto es false', () => {
    expect(fixture.componentInstance.esVisible).toBeFalse();
  });


  it('@Input usuario: valor por defecto es null', () => {
    expect(fixture.componentInstance.usuario).toBeNull();
  });
});
