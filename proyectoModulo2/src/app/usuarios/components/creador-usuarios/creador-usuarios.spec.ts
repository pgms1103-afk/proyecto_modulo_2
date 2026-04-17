import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadorUsuarios } from './creador-usuarios';

describe('CreadorUsuarios', () => {
  let component: CreadorUsuarios;
  let fixture: ComponentFixture<CreadorUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreadorUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(CreadorUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
