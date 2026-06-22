import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Profissional } from 'src/app/models/profissional.model';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.page.html',
  styleUrls: ['./profissional.page.scss'],
  standalone: false,
})
export class ProfissionalPage {
  nome: string = '';
  email1: string = '';
  email2: string = '';
  senha: string = '';
  area: string = '';
  instituto: string = '';

  constructor(private apiService: ApiService) {}

  cadastrar() {
    if (this.email1 !== this.email2) {
      alert('Os e-mails não coincidem!');
      return;
    }
  if (this.area !== 'SAÚDE' && this.area !== 'EDUCACIONAL') {
    alert('Área inválida! Deve ser "SAÚDE" ou "EDUCACIONAL".');
    return;
    }
    const profissional = new Profissional(
      this.nome,
      this.email1,
      this.senha,
      this.area,
      this.instituto
    );

   this.apiService.cadastrarProfissional(profissional).subscribe({
  next: (res) => {
    console.log('Cadastro realizado:', res);
    alert(res.message);
  },
  error: (err) => {
    console.error('Erro ao cadastrar:', err);
    alert(err.error.message || 'Erro no cadastro. Tente novamente.');
  },
});
  }
}