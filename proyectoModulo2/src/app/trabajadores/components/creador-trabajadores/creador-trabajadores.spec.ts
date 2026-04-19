import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creador } from './creador-trabajadores';

describe('Creador', () => {
  let component: Creador;
  let fixture: ComponentFixture<Creador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Creador],
    }).compileComponents();

    fixture = TestBed.createComponent(Creador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
