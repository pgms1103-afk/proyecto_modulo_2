import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buscador } from './buscador-trabajadores';

describe('Buscador', () => {
  let component: Buscador;
  let fixture: ComponentFixture<Buscador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Buscador],
    }).compileComponents();

    fixture = TestBed.createComponent(Buscador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
