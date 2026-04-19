import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTrabajadores } from './tabla-trabajadores';

describe('TablaTrabajadores', () => {
  let component: TablaTrabajadores;
  let fixture: ComponentFixture<TablaTrabajadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaTrabajadores],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaTrabajadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
