import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Usuarios } from './usuarios';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Usuarios', () => {
  let component: Usuarios;
  let fixture: ComponentFixture<Usuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Usuarios],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Usuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('mostrarCreador debe iniciar en false', () => {
    expect(component.mostrarCreador).toBeFalse();
  });

  it('mostrarActualizador debe iniciar en false', () => {
    expect(component.mostrarActualizador).toBeFalse();
  });


  it('abrirCreador: debe poner mostrarCreador en true', () => {
    component.abrirCreador();
    expect(component.mostrarCreador).toBeTrue();
  });

  it('cerrarCreador: debe poner mostrarCreador en false', () => {
    component.abrirCreador();
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
  });

  it('cerrarCreador: no falla si se llama sin haber abierto antes', () => {
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
  });


  it('abrirActualizador: debe poner mostrarActualizador en true', () => {
    component.abrirActualizador();
    expect(component.mostrarActualizador).toBeTrue();
  });

  it('cerrarActualizador: debe poner mostrarActualizador en false', () => {
    component.abrirActualizador();
    component.cerrarActualizador();
    expect(component.mostrarActualizador).toBeFalse();
  });

  it('cerrarActualizador: no falla si se llama sin haber abierto antes', () => {
    component.cerrarActualizador();
    expect(component.mostrarActualizador).toBeFalse();
  });


  it('abrir el creador no afecta mostrarActualizador', () => {
    component.abrirCreador();
    expect(component.mostrarActualizador).toBeFalse();
  });

  it('abrir el actualizador no afecta mostrarCreador', () => {
    component.abrirActualizador();
    expect(component.mostrarCreador).toBeFalse();
  });

  it('ambos modales pueden estar abiertos al mismo tiempo', () => {
    component.abrirCreador();
    component.abrirActualizador();
    expect(component.mostrarCreador).toBeTrue();
    expect(component.mostrarActualizador).toBeTrue();
  });

  it('cerrar uno no cierra el otro', () => {
    component.abrirCreador();
    component.abrirActualizador();
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
    expect(component.mostrarActualizador).toBeTrue();
  });
});
