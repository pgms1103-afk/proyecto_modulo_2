import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPaneles } from './resumen-paneles';

describe('ResumenPaneles', () => {
  let component: ResumenPaneles;
  let fixture: ComponentFixture<ResumenPaneles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenPaneles],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenPaneles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
