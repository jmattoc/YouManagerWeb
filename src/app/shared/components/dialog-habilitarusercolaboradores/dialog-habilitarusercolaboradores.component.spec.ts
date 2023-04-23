import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilitarusercolaboradoresComponent } from './dialog-habilitarusercolaboradores.component';

describe('DialogHabilitarusercolaboradoresComponent', () => {
  let component: DialogHabilitarusercolaboradoresComponent;
  let fixture: ComponentFixture<DialogHabilitarusercolaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHabilitarusercolaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabilitarusercolaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
