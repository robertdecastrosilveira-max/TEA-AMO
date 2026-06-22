import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-professor',
  templateUrl: './pagina-professor.page.html',
  styleUrls: ['./pagina-professor.page.scss'],
  standalone: false,
})
export class PaginaProfessorPage implements OnInit {

  alunos: any[] = [];
  idProfissional: number = 0;
  usuarioLogado: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
      this.idProfissional = this.usuarioLogado.id;
      this.carregarMeusAlunos();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ionViewDidEnter() {
    if (this.idProfissional > 0) {
        this.carregarMeusAlunos();
    }
  }

  carregarMeusAlunos() {
    this.http.get<any[]>(`http://localhost/TEA/backend/buscar_meus_pacientes.php?id_profissional=${this.idProfissional}`)
      .subscribe(
        data => {
          this.alunos = data;
        },
        error => {
          console.error('Erro ao buscar alunos:', error);
        }
      );
  }

  async adicionarAluno() {
    const alert = await this.alertCtrl.create({
      header: 'Novo Aluno',
      message: 'Digite o código de acesso fornecido pelo responsável:',
      inputs: [{ name: 'codigo', type: 'text', placeholder: 'Ex: #A3F9' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Vincular', handler: (data) => this.vincularAluno(data.codigo) }
      ]
    });
    await alert.present();
  }

  vincularAluno(codigo: string) {
    if (!codigo) return;

    const payload = { id_profissional: this.idProfissional, codigo_acesso: codigo };

    this.http.post('http://localhost/TEA/backend/vincular_paciente.php', payload)
      .subscribe(
        async (res: any) => {
          if (res.success) {
            await this.mostrarAlerta('Sucesso', res.message);
            this.carregarMeusAlunos();
          } else {
            await this.mostrarAlerta('Erro', res.message);
          }
        },
        (error) => this.mostrarAlerta('Erro', 'Falha ao conectar.')
      );
  }

  // Funções de Navegação

  goTo(page: string) {
    this.router.navigate([page]);
  }

  verFicha(idAssistido: number) {
    this.router.navigate(['/ficha-pessoal', idAssistido]);
  }
 
  responderQuestionarioEscola(idAssistido: number) {
    this.router.navigate(['/questionario', idAssistido]);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}