import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { SesionService } from '../../services/sesion.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;


  let sesionServiceSpy: jasmine.SpyObj<SesionService>;

  beforeEach(async () => {

    sesionServiceSpy = jasmine.createSpyObj('SesionService', ['cerrarSesion']);

    await TestBed.configureTestingModule({
      declarations: [Navbar],
      providers: [

        { provide: SesionService, useValue: sesionServiceSpy }
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('salir: debe llamar al método cerrarSesion del servicio', () => {

    component.salir();

    expect(sesionServiceSpy.cerrarSesion).toHaveBeenCalled();
    expect(sesionServiceSpy.cerrarSesion).toHaveBeenCalledTimes(1);
  });
});
