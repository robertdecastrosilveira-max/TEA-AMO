import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaProfessorPage } from './pagina-professor.page';

describe('PaginaProfessorPage', () => {
  let component: PaginaProfessorPage;
  let fixture: ComponentFixture<PaginaProfessorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
