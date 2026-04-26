import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InicioSesion } from './inicio-sesion';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';

describe('InicioSesion', () => {
  let component: InicioSesion;
  let fixture: ComponentFixture<InicioSesion>;
  let sesionServiceSpy: jasmine.SpyObj<SesionService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  const usuarioMock: UsuarioModel = {
    id: 1, cedula: 1001, nombre: 'Ana', apellido: 'López',
    correo: 'ana@mail.com', contrasena: '1234', tipoUsuario: 'Admin', tarifa: 0,
  };

  beforeEach(async () => {
    sesionServiceSpy = jasmine.createSpyObj('SesionService', ['login', 'registro']);
    toastrSpy        = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [InicioSesion],
      providers: [
        { provide: SesionService, useValue: sesionServiceSpy },
        { provide: ToastrService, useValue: toastrSpy        },
        ChangeDetectorRef,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(InicioSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('modo debe iniciar en "login"', () => {
    expect(component.modo).toBe('login');
  });

  it('loginForm debe iniciar con correo y pass vacíos', () => {
    expect(component.loginForm.correo).toBe('');
    expect(component.loginForm.pass).toBe('');
  });

  it('regForm debe iniciar con los campos de texto vacíos', () => {
    expect(component.regForm.nombre).toBe('');
    expect(component.regForm.apellido).toBe('');
    expect(component.regForm.correo).toBe('');
    expect(component.regForm.pass).toBe('');
  });

  it('regForm debe iniciar cedula en 0 y tipo en "Normal"', () => {
    expect(component.regForm.cedula).toBe(0);
    expect(component.regForm.tipo).toBe('Normal');
  });


  it('cambiarModo: cambia a "signup" después del timeout', fakeAsync(() => {
    component.cambiarModo('signup');
    tick(0);
    expect(component.modo).toBe('signup');
  }));

  it('cambiarModo: cambia a "login" después del timeout', fakeAsync(() => {
    component.modo = 'signup';
    component.cambiarModo('login');
    tick(0);
    expect(component.modo).toBe('login');
  }));

  it('cambiarModo: antes del timeout el modo NO ha cambiado aún', () => {
    component.cambiarModo('signup');
    // Sin tick, el modo sigue siendo 'login'
    expect(component.modo).toBe('login');
  });


  it('ejecutarLogin: llama al servicio con los datos del loginForm', () => {
    sesionServiceSpy.login.and.returnValue(of(usuarioMock));
    component.loginForm.correo = 'ana@mail.com';
    component.loginForm.pass   = '1234';

    component.ejecutarLogin();

    expect(sesionServiceSpy.login).toHaveBeenCalledWith('ana@mail.com', '1234');
  });

  it('ejecutarLogin: en éxito muestra toastr con el nombre del usuario', () => {
    sesionServiceSpy.login.and.returnValue(of(usuarioMock));
    component.ejecutarLogin();

    expect(toastrSpy.success).toHaveBeenCalledWith('Bienvenido, Ana', 'Éxito');
  });

  it('ejecutarLogin: en error muestra el mensaje del servidor', () => {
    sesionServiceSpy.login.and.returnValue(
      throwError(() => ({ error: 'Credenciales incorrectas' }))
    );
    component.ejecutarLogin();

    expect(toastrSpy.error).toHaveBeenCalledWith('Credenciales incorrectas', 'Error');
  });

  it('ejecutarLogin: en error sin mensaje usa texto por defecto', () => {
    sesionServiceSpy.login.and.returnValue(
      throwError(() => ({ error: null }))
    );
    component.ejecutarLogin();

    expect(toastrSpy.error).toHaveBeenCalledWith('Credenciales inválidas', 'Error');
  });

  it('ejecutarLogin: en error NO muestra toastr success', () => {
    sesionServiceSpy.login.and.returnValue(
      throwError(() => ({ error: 'Error' }))
    );
    component.ejecutarLogin();

    expect(toastrSpy.success).not.toHaveBeenCalled();
  });


  it('ejecutarRegistro: llama al servicio con todos los datos del regForm', () => {
    sesionServiceSpy.registro.and.returnValue(of('Registrado'));
    component.regForm.cedula   = 1001;
    component.regForm.nombre   = 'Ana';
    component.regForm.apellido = 'López';
    component.regForm.correo   = 'ana@mail.com';
    component.regForm.pass     = '1234';
    component.regForm.tipo     = 'Normal';

    component.ejecutarRegistro();

    expect(sesionServiceSpy.registro).toHaveBeenCalledWith(
      1001, 'Ana', 'López', 'ana@mail.com', '1234', 'Normal'
    );
  });

  it('ejecutarRegistro: en éxito cambia el modo a "login" después del timeout', fakeAsync(() => {
    sesionServiceSpy.registro.and.returnValue(of('Registrado'));
    component.modo = 'signup';

    component.ejecutarRegistro();
    tick(0);

    expect(component.modo).toBe('login');
  }));

  it('ejecutarRegistro: en éxito muestra toastr success con el mensaje del servidor', fakeAsync(() => {
    sesionServiceSpy.registro.and.returnValue(of('Usuario creado exitosamente'));

    component.ejecutarRegistro();
    tick(0);

    expect(toastrSpy.success).toHaveBeenCalledWith('Usuario creado exitosamente', 'Registro exitoso');
  }));

  it('ejecutarRegistro: en error muestra toastr error con el mensaje del servidor', () => {
    sesionServiceSpy.registro.and.returnValue(
      throwError(() => ({ error: 'El correo ya está en uso' }))
    );
    component.ejecutarRegistro();

    expect(toastrSpy.error).toHaveBeenCalledWith('El correo ya está en uso', 'Error en el registro');
  });

  it('ejecutarRegistro: en error NO cambia el modo', () => {
    sesionServiceSpy.registro.and.returnValue(
      throwError(() => ({ error: 'Error' }))
    );
    component.modo = 'signup';
    component.ejecutarRegistro();

    expect(component.modo).toBe('signup');
  });

  it('ejecutarRegistro: en error NO muestra toastr success', () => {
    sesionServiceSpy.registro.and.returnValue(
      throwError(() => ({ error: 'Error' }))
    );
    component.ejecutarRegistro();

    expect(toastrSpy.success).not.toHaveBeenCalled();
  });
});
