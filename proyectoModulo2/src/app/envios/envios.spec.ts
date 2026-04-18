import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Envios } from './envios';

describe('Envios', () => {
  let component: Envios;
  let fixture: ComponentFixture<Envios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Envios],
    }).compileComponents();

    fixture = TestBed.createComponent(Envios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
