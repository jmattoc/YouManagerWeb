import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalidadesComponent } from './penalidades.component';

describe('PenalidadesComponent', () => {
  let component: PenalidadesComponent;
  let fixture: ComponentFixture<PenalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
