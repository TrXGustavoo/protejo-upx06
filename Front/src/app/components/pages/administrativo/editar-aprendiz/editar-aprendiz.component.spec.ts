import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAprendizComponent } from './editar-aprendiz.component';

describe('EditarAprendizComponent', () => {
  let component: EditarAprendizComponent;
  let fixture: ComponentFixture<EditarAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAprendizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
