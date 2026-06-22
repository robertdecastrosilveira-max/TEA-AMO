import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimbolosPage } from './simbolos.page';

describe('SimbolosPage', () => {
  let component: SimbolosPage;
  let fixture: ComponentFixture<SimbolosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SimbolosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
