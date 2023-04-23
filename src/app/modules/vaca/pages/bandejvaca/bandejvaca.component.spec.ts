import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejvacaComponent } from './bandejvaca.component';

describe('BandejvacaComponent', () => {
  let component: BandejvacaComponent;
  let fixture: ComponentFixture<BandejvacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejvacaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejvacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
