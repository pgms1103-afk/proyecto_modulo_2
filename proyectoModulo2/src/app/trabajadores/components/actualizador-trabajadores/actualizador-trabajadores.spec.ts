import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizadorTrabajadores } from './actualizador-trabajadores';

describe('ActualizadorTrabajadores', () => {
  let component: ActualizadorTrabajadores;
  let fixture: ComponentFixture<ActualizadorTrabajadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizadorTrabajadores],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorTrabajadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
