import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilitaruserComponent } from './dialog-habilitaruser.component';

describe('DialogHabilitaruserComponent', () => {
  let component: DialogHabilitaruserComponent;
  let fixture: ComponentFixture<DialogHabilitaruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHabilitaruserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabilitaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
