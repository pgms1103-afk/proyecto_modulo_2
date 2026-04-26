import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SesionService } from './sesion.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

describe('SesionService', () => {
  let service: SesionService;
  let httpMock: HttpTestingController;
  let router: Router;

  const urlBase = 'http://localhost:8080/usuario';

  const usuarioAdminMock: UsuarioModel = {
    id: 1, cedula: 1001, nombre: 'Ana', apellido: 'López',
    correo: 'ana@mail.com', contrasena: '1234', tipoUsuario: 'Admin', tarifa: 0,
  };

  const usuarioNormalMock: UsuarioModel = {
    id: 2, cedula: 1002, nombre: 'Juan', apellido: 'Pérez',
    correo: 'juan@mail.com', contrasena: '5678', tipoUsuario: 'Normal', tarifa: 5000,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SesionService],
    });
    service  = TestBed.inject(SesionService);
    httpMock = TestBed.inject(HttpTestingController);
    router   = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('login: debe hacer POST a la URL con correo y contraseña', () => {
    service.login('ana@mail.com', '1234').subscribe();

    const req = httpMock.expectOne(
      `${urlBase}/login?correo=ana@mail.com&contrasena=1234`
    );
    expect(req.request.method).toBe('POST');
    req.flush(usuarioAdminMock);
  });

  it('login: debe guardar el usuario en localStorage tras una respuesta exitosa', () => {
    service.login('ana@mail.com', '1234').subscribe();

    const req = httpMock.expectOne(
      `${urlBase}/login?correo=ana@mail.com&contrasena=1234`
    );
    req.flush(usuarioAdminMock);

    const guardado = JSON.parse(localStorage.getItem('usuarioLogueado')!);
    expect(guardado).toEqual(usuarioAdminMock);
  });

  it('login: si el usuario es Admin, redirige a /dashboard', () => {
    spyOn(router, 'navigate');
    service.login('ana@mail.com', '1234').subscribe();

    const req = httpMock.expectOne(
      `${urlBase}/login?correo=ana@mail.com&contrasena=1234`
    );
    req.flush(usuarioAdminMock);

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('login: si el usuario NO es Admin, redirige a /pedidos', () => {
    spyOn(router, 'navigate');
    service.login('juan@mail.com', '5678').subscribe();

    const req = httpMock.expectOne(
      `${urlBase}/login?correo=juan@mail.com&contrasena=5678`
    );
    req.flush(usuarioNormalMock);

    expect(router.navigate).toHaveBeenCalledWith(['/pedidos']);
  });

  it('login: si las credenciales son inválidas, NO guarda nada en localStorage', () => {
    service.login('mal@mail.com', 'wrongpass').subscribe({ error: () => {} });

    const req = httpMock.expectOne(
      `${urlBase}/login?correo=mal@mail.com&contrasena=wrongpass`
    );
    req.flush('Credenciales inválidas', { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('usuarioLogueado')).toBeNull();
  });


  it('registro: debe hacer POST con todos los parámetros en la URL', () => {
    service.registro(1001, 'Ana', 'López', 'ana@mail.com', '1234', 'Normal').subscribe();

    const req = httpMock.expectOne((r) =>
      r.url.startsWith(`${urlBase}/crearUsuario`) &&
      r.url.includes('cedula=1001') &&
      r.url.includes('nombre=Ana') &&
      r.url.includes('apellido=L') &&
      r.url.includes('contrasena=1234') &&
      r.url.includes('tipoUsuario=Normal')
    );
    expect(req.request.method).toBe('POST');
    req.flush('Usuario creado');
  });

  it('registro: devuelve el mensaje de texto del servidor', () => {
    let respuesta = '';
    service.registro(1001, 'Ana', 'López', 'ana@mail.com', '1234', 'Normal')
      .subscribe((res) => (respuesta = res as string));

    const req = httpMock.expectOne((r) =>
      r.url.startsWith(`${urlBase}/crearUsuario`) &&
      r.url.includes('cedula=1001')
    );
    req.flush('Usuario registrado exitosamente');

    expect(respuesta).toBe('Usuario registrado exitosamente');
  });


  it('cerrarSesion: debe eliminar usuarioLogueado de localStorage', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioAdminMock));
    service.cerrarSesion();
    expect(localStorage.getItem('usuarioLogueado')).toBeNull();
  });

  it('cerrarSesion: debe navegar a la ruta raíz /', () => {
    spyOn(router, 'navigate');
    service.cerrarSesion();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('cerrarSesion: no falla si localStorage ya estaba vacío', () => {
    expect(() => service.cerrarSesion()).not.toThrow();
  });
});
