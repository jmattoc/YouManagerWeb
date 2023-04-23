import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvacaComponent } from './newvaca.component';

describe('NewvacaComponent', () => {
  let component: NewvacaComponent;
  let fixture: ComponentFixture<NewvacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewvacaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
