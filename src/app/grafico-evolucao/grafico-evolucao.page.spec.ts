import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraficoEvolucaoPage } from './grafico-evolucao.page';

describe('GraficoEvolucaoPage', () => {
  let component: GraficoEvolucaoPage;
  let fixture: ComponentFixture<GraficoEvolucaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoEvolucaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
