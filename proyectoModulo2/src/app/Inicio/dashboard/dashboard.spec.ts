import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { TrabajadorService } from '../../services/trabajador.service';
import { UsuarioService } from '../../services/usuario.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;


  let trabajadorServiceSpy: jasmine.SpyObj<TrabajadorService>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;

  beforeEach(async () => {

    trabajadorServiceSpy = jasmine.createSpyObj('TrabajadorService', ['notificarRefresco']);
    usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', ['notificarRefresco']);

    await TestBed.configureTestingModule({
      declarations: [Dashboard],
      providers: [
        { provide: TrabajadorService, useValue: trabajadorServiceSpy },
        { provide: UsuarioService, useValue: usuarioServiceSpy }
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('actualizar: debe llamar a notificarRefresco en ambos servicios', () => {

    component.actualizar();


    expect(trabajadorServiceSpy.notificarRefresco).toHaveBeenCalled();


    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalled();


    expect(trabajadorServiceSpy.notificarRefresco).toHaveBeenCalledTimes(1);
    expect(usuarioServiceSpy.notificarRefresco).toHaveBeenCalledTimes(1);
  });
});
