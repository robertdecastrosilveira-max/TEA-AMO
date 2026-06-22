import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarAssistidosPage } from './cadastrar-assistidos.page';

describe('CadastrarAssistidosPage', () => {
  let component: CadastrarAssistidosPage;
  let fixture: ComponentFixture<CadastrarAssistidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarAssistidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
