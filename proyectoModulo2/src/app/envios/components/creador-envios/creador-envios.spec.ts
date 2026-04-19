import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorEnvios } from './creador-envios';

describe('CreadorEnvios', () => {
  let component: CreadorEnvios;
  let fixture: ComponentFixture<CreadorEnvios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreadorEnvios],
    }).compileComponents();

    fixture = TestBed.createComponent(CreadorEnvios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
