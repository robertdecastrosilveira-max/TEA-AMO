import { TestBed } from '@angular/core/testing';
// CORREÇÃO: O caminho é relativo à pasta atual
import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  // Criamos um "falso" Router para o teste não quebrar ao tentar navegar
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});