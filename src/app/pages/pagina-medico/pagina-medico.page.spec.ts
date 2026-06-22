import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaMedicoPage } from './pagina-medico.page';

describe('PaginaMedicoPage', () => {
  let component: PaginaMedicoPage;
  let fixture: ComponentFixture<PaginaMedicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
