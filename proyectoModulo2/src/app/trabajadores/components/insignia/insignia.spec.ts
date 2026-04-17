import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Insignia } from './insignia';

describe('Insignia', () => {
  let component: Insignia;
  let fixture: ComponentFixture<Insignia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Insignia],
    }).compileComponents();

    fixture = TestBed.createComponent(Insignia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
