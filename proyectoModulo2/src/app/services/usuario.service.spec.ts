import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { UsuarioModel } from '../models/usuario.model';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  const urlBase = 'http://localhost:8080/usuario';

  const usuariosMock: UsuarioModel[] = [
    { id: 1, cedula: 1001, nombre: 'Ana',   apellido: 'López',  correo: 'ana@mail.com',   contrasena: '1234', tipoUsuario: 'Admin',      tarifa: 0 },
    { id: 2, cedula: 1002, nombre: 'Juan',  apellido: 'Pérez',  correo: 'juan@mail.com',  contrasena: '5678', tipoUsuario: 'Normal',     tarifa: 5000 },
    { id: 3, cedula: 1003, nombre: 'María', apellido: 'Ruiz',   correo: 'maria@mail.com', contrasena: 'abcd', tipoUsuario: 'Premium',    tarifa: 10000 },
    { id: 4, cedula: 1004, nombre: 'Luis',  apellido: 'Torres', correo: 'luis@mail.com',  contrasena: 'wxyz', tipoUsuario: 'Concurrente', tarifa: 8000 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService],
    });
    service  = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsuarios: debe hacer GET a /mostrarUsuarios y devolver la lista', () => {
    service.getUsuarios().subscribe((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(usuariosMock);
    });

    const req = httpMock.expectOne(`${urlBase}/mostrarUsuarios`);
    expect(req.request.method).toBe('GET');
    req.flush(usuariosMock, { status: 200, statusText: 'OK' });
  });


  it('postCrearUsuarios: debe hacer POST con todos los parámetros en la URL', () => {
    service
      .postCrearUsuarios(1001, 'Ana', 'López', 'ana@mail.com', '1234', 'Admin')
      .subscribe((res) => {
        expect(res).toBe('Usuario creado');
      });

    const req = httpMock.expectOne((r) =>
      r.url.startsWith(`${urlBase}/crearUsuario`) &&
      r.url.includes('cedula=1001') &&
      r.url.includes('nombre=Ana') &&
      r.url.includes('apellido=L') &&
      r.url.includes('contrasena=1234') &&
      r.url.includes('tipoUsuario=Admin')
    );
    expect(req.request.method).toBe('POST');
    req.flush('Usuario creado');
  });

  it('deleteUsuarios: debe hacer DELETE con el id correcto', () => {
    service.deleteUsuarios(2).subscribe((res) => {
      expect(res).toBe('Eliminado');
    });

    const req = httpMock.expectOne(`${urlBase}/eliminarUsuario?id=2`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Eliminado');
  });

  it('putActualizarUsuario: debe hacer PUT con todos los parámetros', () => {
    service
      .putActualizarUsuario(1, 1001, 'Ana', 'López', 'ana@mail.com', 'nueva123')
      .subscribe((res) => {
        expect(res).toBe('Actualizado');
      });

    const req = httpMock.expectOne((r) =>
      r.url.startsWith(`${urlBase}/actualizarUsuario`) &&
      r.url.includes('id=1') &&
      r.url.includes('cedula=1001') &&
      r.url.includes('nombre=Ana') &&
      r.url.includes('contrasena=nueva123')
    );
    expect(req.request.method).toBe('PUT');
    req.flush('Actualizado');
  });

  it('putActualizarTipo: debe hacer PUT con id y tipoUsuario', () => {
    service.putActualizarTipo(2, 'Premium').subscribe((res) => {
      expect(res).toBe('Tipo actualizado');
    });

    const req = httpMock.expectOne((r) =>
      r.url.startsWith(`${urlBase}/actualizartipo`) &&
      r.url.includes('id=2') &&
      r.url.includes('tipoUsuario=Premium')
    );
    expect(req.request.method).toBe('PUT');
    req.flush('Tipo actualizado');
  });

  it('getBuscarPorNombre: debe hacer GET con el nombre en la URL', () => {
    service.getBuscarPorNombre('Ana').subscribe((res) => {
      expect(res.body).toEqual([usuariosMock[0]]);
    });

    const req = httpMock.expectOne(`${urlBase}/buscarpornombre?nombre=Ana`);
    expect(req.request.method).toBe('GET');
    req.flush([usuariosMock[0]], { status: 200, statusText: 'OK' });
  });

  it('getBuscarPorNombre: devuelve lista vacía si no hay coincidencias', () => {
    service.getBuscarPorNombre('XYZ').subscribe((res) => {
      expect(res.body).toEqual([]);
    });

    const req = httpMock.expectOne(`${urlBase}/buscarpornombre?nombre=XYZ`);
    req.flush([], { status: 200, statusText: 'OK' });
  });

  it('notificarRefresco: debe emitir en refrescarTabla$', (done) => {
    service.refrescarTabla$.subscribe(() => {
      expect(true).toBeTrue();
      done();
    });
    service.notificarRefresco();
  });

  it('actualizarUsuarios: debe emitir la lista en listaUsuarios$', (done) => {
    service.listaUsuarios$.subscribe((lista) => {
      expect(lista).toEqual(usuariosMock);
      done();
    });
    service.actualizarUsuarios(usuariosMock);
  });

  it('filtrarPorTipo: debe emitir el tipo en tipoFiltro$', (done) => {
    service.tipoFiltro$.subscribe((tipo) => {
      expect(tipo).toBe('Premium');
      done();
    });
    service.filtrarPorTipo('Premium');
  });

  it('filtrarPorTipo: debe emitir "todos" sin problemas', (done) => {
    service.tipoFiltro$.subscribe((tipo) => {
      expect(tipo).toBe('todos');
      done();
    });
    service.filtrarPorTipo('todos');
  });
});
