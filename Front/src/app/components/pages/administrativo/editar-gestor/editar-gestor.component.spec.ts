import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGestorComponent } from './editar-gestor.component';

describe('EditarGestorComponent', () => {
  let component: EditarGestorComponent;
  let fixture: ComponentFixture<EditarGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarGestorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
