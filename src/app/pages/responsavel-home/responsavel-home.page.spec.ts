import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsavelHomePage } from './responsavel-home.page';

describe('ResponsavelHomePage', () => {
  let component: ResponsavelHomePage;
  let fixture: ComponentFixture<ResponsavelHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
