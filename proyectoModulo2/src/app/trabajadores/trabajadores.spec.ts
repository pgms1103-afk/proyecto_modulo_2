import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Trabajadores } from './trabajadores';


describe('Trabajadores (componente padre)', () => {
  let component: Trabajadores;
  let fixture: ComponentFixture<Trabajadores>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Trabajadores],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture   = TestBed.createComponent(Trabajadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('mostrarCreador inicia en false', () => {
    expect(component.mostrarCreador).toBeFalse();
  });

  it('mostrarActualizador inicia en false', () => {
    expect(component.mostrarActualizador).toBeFalse();
  });


  it('abrirCreador() – pone mostrarCreador en true', () => {
    component.abrirCreador();
    expect(component.mostrarCreador).toBeTrue();
  });

  it('cerrarCreador() – pone mostrarCreador en false', () => {
    component.mostrarCreador = true;
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
  });

  it('abrirCreador → cerrarCreador – ciclo completo', () => {
    component.abrirCreador();
    expect(component.mostrarCreador).toBeTrue();
    component.cerrarCreador();
    expect(component.mostrarCreador).toBeFalse();
  });


  it('abrirActualizador() – pone mostrarActualizador en true', () => {
    component.abrirActualizador();
    expect(component.mostrarActualizador).toBeTrue();
  });

  it('cerrarActualizador() – pone mostrarActualizador en false', () => {
    component.mostrarActualizador = true;
    component.cerrarActualizador();
    expect(component.mostrarActualizador).toBeFalse();
  });

  it('abrirActualizador → cerrarActualizador – ciclo completo', () => {
    component.abrirActualizador();
    expect(component.mostrarActualizador).toBeTrue();
    component.cerrarActualizador();
    expect(component.mostrarActualizador).toBeFalse();
  });


  it('abrir creador no afecta el flag del actualizador', () => {
    component.abrirCreador();
    expect(component.mostrarActualizador).toBeFalse();
  });

  it('abrir actualizador no afecta el flag del creador', () => {
    component.abrirActualizador();
    expect(component.mostrarCreador).toBeFalse();
  });
});
