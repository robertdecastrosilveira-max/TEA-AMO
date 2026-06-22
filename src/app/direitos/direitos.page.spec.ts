import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DireitosPage } from './direitos.page';

describe('DireitosPage', () => {
  let component: DireitosPage;
  let fixture: ComponentFixture<DireitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DireitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
