import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // 1. Verifica se existe a chave 'usuarioLogado' que guardaste no Login
    // Esta chave é criada no teu login.page.ts quando o login é bem-sucedido
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
      // Se existem dados do utilizador, permite a entrada na página
      return true;
    } else {
      // Se NÃO existem dados, redireciona o utilizador de volta para o Login
      this.router.navigate(['/login']);
      return false;
    }
  }
}