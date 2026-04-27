import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Pedidos } from './pedidos';
import { EnvioService } from '../services/envio.service';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';

describe('Pedidos', () => {
  let component: Pedidos;
  let fixture: ComponentFixture<Pedidos>;
  let envioServiceSpy: jasmine.SpyObj<EnvioService>;
  let sesionServiceSpy: jasmine.SpyObj<SesionService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const usuarioMock: UsuarioModel = {
    id: 1, cedula: 1001, nombre: 'Juan', apellido: 'Pérez',
    correo: 'juan@mail.com', contrasena: '5678', tipoUsuario: 'Normal', tarifa: 5000,
  };

  beforeEach(async () => {
    envioServiceSpy  = jasmine.createSpyObj('EnvioService',  ['postCrearEnvio']);
    sesionServiceSpy = jasmine.createSpyObj('SesionService', ['cerrarSesion']);
    toastrSpy        = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    routerSpy        = jasmine.createSpyObj('Router',        ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [Pedidos],
      providers: [
        { provide: EnvioService,  useValue: envioServiceSpy  },
        { provide: SesionService, useValue: sesionServiceSpy },
        { provide: ToastrService, useValue: toastrSpy        },
        { provide: Router,        useValue: routerSpy        },
        ChangeDetectorRef,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    // Limpiar localStorage antes de cada prueba
    localStorage.clear();

    fixture   = TestBed.createComponent(Pedidos);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ── Creación ───────────────────────────────────────────────────────────────

  it('should create', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // ── ngOnInit ───────────────────────────────────────────────────────────────

  it('ngOnInit: si hay usuario en localStorage, lo carga en usuarioActual', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges(); // dispara ngOnInit
    expect(component.usuarioActual).toEqual(usuarioMock);
  });

  it('ngOnInit: si NO hay usuario en localStorage, redirige a /', () => {
    fixture.detectChanges(); // dispara ngOnInit sin usuario
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('ngOnInit: si no hay usuario, usuarioActual queda en null', () => {
    fixture.detectChanges();
    expect(component.usuarioActual).toBeNull();
  });

  // ── Valores iniciales del formulario ───────────────────────────────────────

  it('pedidoForm debe inicializar tipoPaquete como "Alimenticio"', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();
    expect(component.pedidoForm.tipoPaquete).toBe('Alimenticio');
  });

  it('pedidoForm debe inicializar descripcion, destino y fechas como cadenas vacías', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();
    expect(component.pedidoForm.descripcion).toBe('');
    expect(component.pedidoForm.destino).toBe('');
    expect(component.pedidoForm.fechaEnvio).toBe('');
    expect(component.pedidoForm.fechaEntrega).toBe('');
  });

  it('pedidoForm debe inicializar peso en 0', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();
    expect(component.pedidoForm.peso).toBe(0);
  });

  // ── seleccionarTipo ────────────────────────────────────────────────────────

  it('seleccionarTipo: debe actualizar tipoPaquete en el formulario', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();
    component.seleccionarTipo('Carta');
    expect(component.pedidoForm.tipoPaquete).toBe('Carta');
  });

  it('seleccionarTipo: funciona con todos los tipos válidos', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.seleccionarTipo('No Alimenticio');
    expect(component.pedidoForm.tipoPaquete).toBe('No Alimenticio');

    component.seleccionarTipo('Alimenticio');
    expect(component.pedidoForm.tipoPaquete).toBe('Alimenticio');
  });

  // ── enviarPedido ───────────────────────────────────────────────────────────

  it('enviarPedido: llama al servicio con las fechas formateadas con ":00"', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.pedidoForm.tipoPaquete  = 'Carta';
    component.pedidoForm.descripcion  = 'Doc legal';
    component.pedidoForm.peso         = 0.5;
    component.pedidoForm.destino      = 'Bogotá';
    component.pedidoForm.fechaEnvio   = '2025-04-01T08:00';
    component.pedidoForm.fechaEntrega = '2025-04-03T08:00';

    envioServiceSpy.postCrearEnvio.and.returnValue(of('OK'));
    component.enviarPedido();

    expect(envioServiceSpy.postCrearEnvio).toHaveBeenCalledWith(
      'Carta', 'Doc legal', 0.5, 'Bogotá',
      '2025-04-01T08:00:00',
      '2025-04-03T08:00:00'
    );
  });

  it('enviarPedido: en éxito muestra toastr success con el mensaje del servidor', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    envioServiceSpy.postCrearEnvio.and.returnValue(of('Pedido registrado'));
    component.enviarPedido();

    expect(toastrSpy.success).toHaveBeenCalledWith('Pedido registrado', '¡Pedido Exitoso!');
  });

  it('enviarPedido: si el servidor devuelve vacío, usa mensaje por defecto', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    envioServiceSpy.postCrearEnvio.and.returnValue(of(''));
    component.enviarPedido();

    expect(toastrSpy.success).toHaveBeenCalledWith('Envío creado correctamente', '¡Pedido Exitoso!');
  });

  it('enviarPedido: en éxito limpia el formulario después del timeout', fakeAsync(() => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.pedidoForm.descripcion  = 'Doc';
    component.pedidoForm.destino      = 'Cali';
    component.pedidoForm.peso         = 3;
    component.pedidoForm.fechaEnvio   = '2025-04-01T08:00';
    component.pedidoForm.fechaEntrega = '2025-04-03T08:00';

    envioServiceSpy.postCrearEnvio.and.returnValue(of('OK'));
    component.enviarPedido();
    tick(0); // avanza el setTimeout

    expect(component.pedidoForm.descripcion).toBe('');
    expect(component.pedidoForm.destino).toBe('');
    expect(component.pedidoForm.peso).toBe(0);
    expect(component.pedidoForm.tipoPaquete).toBe('Alimenticio');
  }));

  it('enviarPedido: en error muestra toastr error con el mensaje correcto', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    envioServiceSpy.postCrearEnvio.and.returnValue(
      throwError(() => ({ error: 'Fallo del servidor' }))
    );
    component.enviarPedido();

    expect(toastrSpy.error).toHaveBeenCalledWith('Error al procesar el pedido', 'Error');
  });

  it('enviarPedido: en error NO limpia el formulario', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.pedidoForm.descripcion = 'Prueba';
    envioServiceSpy.postCrearEnvio.and.returnValue(throwError(() => ({ error: 'Error' })));
    component.enviarPedido();

    expect(component.pedidoForm.descripcion).toBe('Prueba');
  });

  // ── limpiarFormulario ──────────────────────────────────────────────────────

  it('limpiarFormulario: restablece todos los campos a sus valores iniciales', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.pedidoForm.descripcion  = 'Algo';
    component.pedidoForm.destino      = 'Medellín';
    component.pedidoForm.peso         = 10;
    component.pedidoForm.fechaEnvio   = '2025-04-01T08:00';
    component.pedidoForm.fechaEntrega = '2025-04-03T08:00';
    component.pedidoForm.tipoPaquete  = 'Carta';

    component.limpiarFormulario();

    expect(component.pedidoForm.descripcion).toBe('');
    expect(component.pedidoForm.destino).toBe('');
    expect(component.pedidoForm.peso).toBe(0);
    expect(component.pedidoForm.fechaEnvio).toBe('');
    expect(component.pedidoForm.fechaEntrega).toBe('');
    expect(component.pedidoForm.tipoPaquete).toBe('Alimenticio');
  });

  // ── salir ──────────────────────────────────────────────────────────────────

  it('salir: debe llamar cerrarSesion del servicio', () => {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMock));
    fixture.detectChanges();

    component.salir();
    expect(sesionServiceSpy.cerrarSesion).toHaveBeenCalled();
  });
});
