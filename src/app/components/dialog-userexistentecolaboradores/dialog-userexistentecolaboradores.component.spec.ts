import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserexistentecolaboradoresComponent } from './dialog-userexistentecolaboradores.component';

describe('DialogUserexistentecolaboradoresComponent', () => {
  let component: DialogUserexistentecolaboradoresComponent;
  let fixture: ComponentFixture<DialogUserexistentecolaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserexistentecolaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserexistentecolaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
