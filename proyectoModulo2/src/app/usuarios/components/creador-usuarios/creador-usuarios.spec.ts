import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadorUsuarios } from './creador-usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreadorUsuarios', () => {
  let component: CreadorUsuarios;
  let fixture: ComponentFixture<CreadorUsuarios>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', [
      'postCrearUsuarios',
      'notificarRefresco',
    ]);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [CreadorUsuarios],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        { provide: ToastrService,  useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreadorUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debe inicializar nombre, apellido, correo y contrasena como cadenas vacías', () => {
    expect(component.nombre).toBe('');
    expect(component.apellido).toBe('');
    expect(component.correo).toBe('');
    expect(component.contrasena).toBe('');
  });

  it('debe inicializar cedula y tarifa en 0', () => {
    expect(component.cedula).toBe(0);
    expect(component.tarifa).toBe(0);
  });

  it('debe inicializar tipoUsuario como cadena vacía', () => {
    expect(component.tipoUsuario).toBe('');
  });


  it('crearUsuario: llama al servicio con los parámetros correctos', () => {
    component.cedula      = 1001;
    component.nombre      = 'Ana';
    component.apellido    = 'López';
    component.correo      = 'ana@mail.com';
    component.contrasena  = '1234';
    component.tipoUsuario = 'Admin';

    usuarioServiceSpy.postCrearUsuarios.and.returnValue(of('Usuario creado'));

    component.crearUsuario();

    expect(usuarioServiceSpy.postCrearUsuarios).toHaveBeenCalledWith(
      1001, 'Ana', 'López', 'ana@mail.com', '1234', 'Admin'
    );
  });

  it('crearUsuario: en éxito muestra toastr success y notifica refresco', () => {
    usuarioServiceSpy.postCrearUsuarios.and.returnValue(of('Usuario creado'));
    spyOn(component, 'cerrar');

    component.crearUsuario();

    expect(toastrSpy.success).toHaveBeenCalledWith('Usuario creado con éxito', 'Éxito');
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();
    expect(component.cerrar).toHaveBeenCalled();
  });

  it('crearUsuario: en error muestra toastr error con el mensaje del servidor', () => {
    usuarioServiceSpy.postCrearUsuarios.and.returnValue(
      throwError(() => ({ error: 'El correo ya existe' }))
    );

    component.crearUsuario();

    expect(toastrSpy.error).toHaveBeenCalledWith('El correo ya existe', 'Error de creación');
  });

  it('crearUsuario: en error NO llama a notificarRefresco ni a cerrar', () => {
    usuarioServiceSpy.postCrearUsuarios.and.returnValue(
      throwError(() => ({ error: 'Error' }))
    );
    spyOn(component, 'cerrar');

    component.crearUsuario();

    expect(usuarioServiceSpy.notificarRefresco).not.toHaveBeenCalled();
    expect(component.cerrar).not.toHaveBeenCalled();
  });


  it('cerrar: debe emitir el evento alCerrar', () => {
    spyOn(component.alCerrar, 'emit');
    component.cerrar();
    expect(component.alCerrar.emit).toHaveBeenCalled();
  });


  it('@Input esVisible: acepta valor true', () => {
    component.esVisible = true;
    fixture.detectChanges();
    expect(component.esVisible).toBeTrue();
  });

  it('@Input esVisible: valor por defecto es false', () => {
    const freshFixture = TestBed.createComponent(CreadorUsuarios);
    const freshComponent = freshFixture.componentInstance;
    expect(freshComponent.esVisible).toBeFalse();
  });
});
