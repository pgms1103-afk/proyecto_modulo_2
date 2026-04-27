import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TrabajadorService } from './trabajador.service';
import { TrabajadorModel } from '../models/trabajor.model';


const mockTrabajador: TrabajadorModel = {
  id: 1,
  nombre: 'Carlos Pérez',
  cedula: 123456,
  telefono: 3001234567,
  email: 'carlos@test.com',
  cargo: 'Conductor',
};

const mockLista: TrabajadorModel[] = [
  mockTrabajador,
  {
    id: 2,
    nombre: 'Ana Gómez',
    cedula: 654321,
    telefono: 3109876543,
    email: 'ana@test.com',
    cargo: 'Administrador',
  },
];

const BASE = 'http://localhost:8080/trabajador';


describe('TrabajadorService', () => {
  let service: TrabajadorService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrabajadorService],
    });
    service  = TestBed.inject(TrabajadorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });


  it('getTrabajadores() – realiza GET a la URL correcta y retorna la lista', () => {
    service.getTrabajadores().subscribe((resp) => {
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual(mockLista);
    });

    const req = httpMock.expectOne(`${BASE}/mostrartrabajadores`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLista, { status: 200, statusText: 'OK' });
  });

  it('getTrabajadores() – maneja respuesta vacía sin errores', () => {
    service.getTrabajadores().subscribe((resp) => {
      expect(resp.body).toEqual([]);
    });

    const req = httpMock.expectOne(`${BASE}/mostrartrabajadores`);
    req.flush([], { status: 200, statusText: 'OK' });
  });


  it('postCrearTrabajadores() – realiza POST con los query-params correctos', () => {
    service
      .postCrearTrabajadores('Carlos', 123456, 3001234567, 'carlos@test.com', 'Conductor')
      .subscribe((resp) => expect(resp).toBe('OK'));

    const req = httpMock.expectOne(
      `${BASE}/creartrabajador?nombre=Carlos&cedula=123456&telefono=3001234567&email=carlos@test.com&cargo=Conductor`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeNull();
    req.flush('OK');
  });


  it('deleteTrabajadores() – realiza DELETE con el id correcto', () => {
    service.deleteTrabajadores(1).subscribe((resp) => expect(resp).toBe('Eliminado'));

    const req = httpMock.expectOne(`${BASE}/eliminartrabajador?id=1`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Eliminado');
  });


  it('buscarTrabajadorPorNombre() – realiza GET con el nombre en el query', () => {
    service.buscarTrabajadorPorNombre('Carlos').subscribe((resp) => {
      expect(resp.body).toEqual([mockTrabajador]);
    });

    const req = httpMock.expectOne(`${BASE}/buscartrabajadorpornombre?nombre=Carlos`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTrabajador], { status: 200, statusText: 'OK' });
  });


  it('putActualizarTrabajador() – realiza PUT con todos los parámetros', () => {
    service
      .putActualizarTrabajador(1, 'Carlos', 123456, 3001234567, 'carlos@test.com', 'Conductor')
      .subscribe((resp) => expect(resp).toBe('Actualizado'));

    const req = httpMock.expectOne(
      `${BASE}/actualizartrabajador?id=1&nombre=Carlos&cedula=123456&telefono=3001234567&email=carlos@test.com`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush('Actualizado');
  });


  it('putActualizarCargo() – realiza PUT con id y cargo correctos', () => {
    service.putActualizarCargo(1, 'Administrador').subscribe((resp) => {
      expect(resp).toBe('Cargo actualizado');
    });

    const req = httpMock.expectOne(`${BASE}/actualizarcargo?id=1&cargo=Administrador`);
    expect(req.request.method).toBe('PUT');
    req.flush('Cargo actualizado');
  });


  it('notificarRefresco() – emite en refrescarTabla$', () => {
    let emitido = false;
    service.refrescarTabla$.subscribe(() => (emitido = true));
    service.notificarRefresco();
    expect(emitido).toBeTrue();
  });

  it('filtrarPorCargo() – emite el valor en cargoFiltro$', () => {
    let cargoRecibido = '';
    service.cargoFiltro$.subscribe((c) => (cargoRecibido = c));
    service.filtrarPorCargo('Conductor');
    expect(cargoRecibido).toBe('Conductor');
  });

  it('actualizarTrabajadores() – emite la lista en listaTrabajadores$', () => {
    let listaRecibida: TrabajadorModel[] = [];
    service.listaTrabajadores$.subscribe((l) => (listaRecibida = l));
    service.actualizarTrabajadores(mockLista);
    expect(listaRecibida).toEqual(mockLista);
  });
});
