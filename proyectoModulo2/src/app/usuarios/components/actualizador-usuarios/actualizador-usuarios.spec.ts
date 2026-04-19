import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizadorUsuarios } from './actualizador-usuarios';

describe('ActualizadorUsuarios', () => {
  let component: ActualizadorUsuarios;
  let fixture: ComponentFixture<ActualizadorUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizadorUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
