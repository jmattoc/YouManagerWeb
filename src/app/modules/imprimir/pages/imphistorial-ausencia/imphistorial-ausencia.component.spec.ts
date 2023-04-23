import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImphistorialAusenciaComponent } from './imphistorial-ausencia.component';

describe('ImphistorialAusenciaComponent', () => {
  let component: ImphistorialAusenciaComponent;
  let fixture: ComponentFixture<ImphistorialAusenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImphistorialAusenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImphistorialAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
