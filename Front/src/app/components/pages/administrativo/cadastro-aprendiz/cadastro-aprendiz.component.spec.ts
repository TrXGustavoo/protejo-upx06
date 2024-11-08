import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAprendizComponent } from './cadastro-aprendiz.component';

describe('CadastroAprendizComponent', () => {
  let component: CadastroAprendizComponent;
  let fixture: ComponentFixture<CadastroAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroAprendizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
