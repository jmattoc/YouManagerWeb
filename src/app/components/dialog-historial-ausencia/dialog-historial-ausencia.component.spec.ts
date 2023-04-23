import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistorialAusenciaComponent } from './dialog-historial-ausencia.component';

describe('DialogHistorialAusenciaComponent', () => {
  let component: DialogHistorialAusenciaComponent;
  let fixture: ComponentFixture<DialogHistorialAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistorialAusenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistorialAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
