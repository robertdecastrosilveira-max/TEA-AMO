import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichaPessoalPage } from './ficha-pessoal.page';

describe('FichaPessoalPage', () => {
  let component: FichaPessoalPage;
  let fixture: ComponentFixture<FichaPessoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPessoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
