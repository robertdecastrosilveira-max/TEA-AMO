import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfissionalPage } from './profissional.page';

describe('ProfissionalPage', () => {
  let component: ProfissionalPage;
  let fixture: ComponentFixture<ProfissionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
