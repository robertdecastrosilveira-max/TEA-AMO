import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  logar() {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha e-mail e senha.');
      return;
    }

    this.apiService.loginUsuario(this.email, this.senha).subscribe({
      next: (res) => {
        if (res && res.success && res.usuario) {
          alert(res.message);

          localStorage.setItem('usuarioLogado', JSON.stringify(res.usuario));
          localStorage.setItem('isLoggedIn', 'true');

          if (res.usuario.tipo === 'responsavel') {
            this.router.navigate(['/responsavel-home']); 
          } else if (res.usuario.tipo === 'profissional' && res.usuario.area === 'SAÚDE') {
            this.router.navigate(['/pagina-medico']); // Ajusta a rota se necessário
          } else {
            this.router.navigate(['/pagina-professor']);
          }

        } else {
          alert(res.message || 'E-mail ou senha inválidos.');
        }
      },
      error: (err) => {
        console.error('Erro na requisição de login:', err);
        const mensagemErro = err.error?.message || 'Ocorreu um erro de comunicação. Tente novamente.';
        alert(mensagemErro);
      }
    });
  }
}