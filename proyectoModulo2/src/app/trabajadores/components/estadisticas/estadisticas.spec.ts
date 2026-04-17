import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadisticas } from './estadisticas';

describe('Estadisticas', () => {
  let component: Estadisticas;
  let fixture: ComponentFixture<Estadisticas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Estadisticas],
    }).compileComponents();

    fixture = TestBed.createComponent(Estadisticas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
