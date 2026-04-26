import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvioService } from './envio.service';
import { EnvioModel } from '../models/envio.model';

describe('EnvioService', () => {
  let service: EnvioService;
  let httpMock: HttpTestingController;

  const urlBase = 'http://localhost:8080/envio';

  const enviosMock: EnvioModel[] = [
    {
      id: 1,
      tipoPaquete: 'Alimenticio',
      descripcion: 'Caja de frutas',
      peso: 3,
      direccionDestino: 'Calle 10 #5-20',
      costo: 15000,
      fechaEnvio: '2025-04-01T08:00:00',
      fechaEntrega: '2025-04-03T08:00:00',
      entregaATiempo: true,
    },
    {
      id: 2,
      tipoPaquete: 'Carta',
      descripcion: 'Documento legal',
      peso: 0.2,
      direccionDestino: 'Carrera 7 #12-30',
      costo: 5000,
      fechaEnvio: '2025-04-02T10:00:00',
      fechaEntrega: '2025-04-10T10:00:00',
      entregaATiempo: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnvioService],
    });
    service = TestBed.inject(EnvioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getEnvios: debe hacer GET a la URL correcta y devolver la lista', () => {
    service.getEnvios().subscribe((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(enviosMock);
    });

    const req = httpMock.expectOne(`${urlBase}/mostrarpaquetes`);
    expect(req.request.method).toBe('GET');
    req.flush(enviosMock, { status: 200, statusText: 'OK' });
  });


  it('postCrearEnvio: debe hacer POST con los parámetros correctos', () => {
    service
      .postCrearEnvio('Alimenticio', 'Descripción', 5, 'Bogotá', '2025-04-01T08:00', '2025-04-03T08:00')
      .subscribe((res) => {
        expect(res).toBe('Envío creado');
      });

    const req = httpMock.expectOne((r) => r.url === `${urlBase}/crearpaquete`);
    expect(req.request.method).toBe('POST');
    expect(req.request.params.get('tipoPaquete')).toBe('Alimenticio');
    expect(req.request.params.get('descripcion')).toBe('Descripción');
    expect(req.request.params.get('peso')).toBe('5');
    expect(req.request.params.get('destino')).toBe('Bogotá');
    req.flush('Envío creado');
  });

  it('putActualizarEnvio: debe hacer PUT con id y parámetros correctos', () => {
    service
      .putActualizarEnvio(1, 'Carta', 'Actualizado', 1, 'Medellín', '2025-04-05T08:00', '2025-04-07T08:00')
      .subscribe((res) => {
        expect(res).toBe('Actualizado');
      });

    const req = httpMock.expectOne((r) => r.url === `${urlBase}/actualizarpaquete`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.params.get('id')).toBe('1');
    expect(req.request.params.get('tipoPaquete')).toBe('Carta');
    req.flush('Actualizado');
  });


  it('deleteEnvio: debe hacer DELETE a la URL con el id correcto', () => {
    service.deleteEnvio(2).subscribe((res) => {
      expect(res).toBe('Eliminado');
    });

    const req = httpMock.expectOne(`${urlBase}/eliminarpaquete?id=2`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Eliminado');
  });


  it('getEnviosPorTipo: debe hacer GET con el tipo en la URL', () => {
    service.getEnviosPorTipo('Carta').subscribe((response) => {
      expect(response.body).toEqual([enviosMock[1]]);
    });

    const req = httpMock.expectOne(`${urlBase}/buscarpaqueteportipo?tipo=Carta`);
    expect(req.request.method).toBe('GET');
    req.flush([enviosMock[1]], { status: 200, statusText: 'OK' });
  });


  it('getEnviosPorEstado: debe hacer GET con estado true', () => {
    service.getEnviosPorEstado(true).subscribe((response) => {
      expect(response.body).toEqual([enviosMock[0]]);
    });

    const req = httpMock.expectOne(`${urlBase}/buscaratiempo?estado=true`);
    expect(req.request.method).toBe('GET');
    req.flush([enviosMock[0]], { status: 200, statusText: 'OK' });
  });


  it('notificarRefresco: debe emitir en refrescarTabla$', (done) => {
    service.refrescarTabla$.subscribe(() => {
      expect(true).toBeTrue(); // Se ejecutó
      done();
    });
    service.notificarRefresco();
  });

  it('filtrarPorTipo: debe emitir el tipo en tipoFiltro$', (done) => {
    service.tipoFiltro$.subscribe((tipo) => {
      expect(tipo).toBe('Alimenticio');
      done();
    });
    service.filtrarPorTipo('Alimenticio');
  });

  it('filtrarPorEstado: debe emitir el texto en estadoFiltro$', (done) => {
    service.estadoFiltro$.subscribe((texto) => {
      expect(texto).toBe('a tiempo');
      done();
    });
    service.filtrarPorEstado('a tiempo');
  });

  it('actualizarEnvios: debe emitir la lista en listaEnvios$', (done) => {
    service.listaEnvios$.subscribe((lista) => {
      expect(lista).toEqual(enviosMock);
      done();
    });
    service.actualizarEnvios(enviosMock);
  });
});
