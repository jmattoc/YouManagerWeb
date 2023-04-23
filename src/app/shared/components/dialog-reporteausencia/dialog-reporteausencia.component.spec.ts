import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReporteausenciaComponent } from './dialog-reporteausencia.component';

describe('DialogReporteausenciaComponent', () => {
  let component: DialogReporteausenciaComponent;
  let fixture: ComponentFixture<DialogReporteausenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReporteausenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReporteausenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
