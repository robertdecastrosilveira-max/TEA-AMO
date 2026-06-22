import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
  standalone: false,
})
export class QuestionarioPage implements OnInit {

  idAssistido: number = 0;
  idUsuario: number = 0;
  tipoUsuario: string = ''; // 'responsavel' ou 'profissional'
  
  perguntas: any[] = [];
  isLoading = true;
  bloqueado = false;
  mensagemBloqueio = '';
  tituloPagina = 'Monitoramento'; // Título dinâmico

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idAssistido = idParam ? +idParam : 0;
    
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString && this.idAssistido > 0) {
      const usuario = JSON.parse(usuarioString);
      this.idUsuario = usuario.id;
      this.tipoUsuario = usuario.tipo; // Pega se é pai ou professor

      // Define o título baseado no tipo
      this.tituloPagina = this.tipoUsuario === 'profissional' ? 'Relatório Escolar' : 'Monitoramento Diário';

      this.verificarStatus();
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  verificarStatus() {
    this.isLoading = true;
    
    // Verifica se ESTE usuário (seja pai ou prof) já respondeu para ESTE assistido hoje
    const url = `http://localhost/TEA/backend/verificar_status_questionario.php?id_responsavel=${this.idUsuario}&id_assistido=${this.idAssistido}`;
    
    this.http.get<any>(url).subscribe(
      res => {
        if (res.pode_responder) {
          this.bloqueado = false;
          this.carregarPerguntas();
        } else {
          this.bloqueado = true;
          this.mensagemBloqueio = res.mensagem;
          this.isLoading = false;
        }
      },
      error => {
        console.error('Erro status:', error);
        this.mostrarAlerta('Erro', 'Falha ao verificar status.');
        this.isLoading = false;
      }
    );
  }

  carregarPerguntas() {
    // A MÁGICA ACONTECE AQUI:
    // Se for profissional, busca perguntas da ESCOLA. Se for pai, busca perguntas de CASA.
    let urlScript = 'buscar_perguntas_diarias.php'; // Padrão (Casa)
    
    if (this.tipoUsuario === 'profissional') {
        urlScript = 'buscar_perguntas_escola.php'; // Escola
    }

    this.http.get<any[]>(`http://localhost/TEA/backend/${urlScript}`)
      .subscribe(
        data => {
          this.perguntas = data;
          this.isLoading = false;
        },
        error => {
          console.error('Erro perguntas:', error);
          this.mostrarAlerta('Erro', 'Falha ao carregar perguntas.');
          this.isLoading = false;
        }
      );
  }

  enviarRespostas() {
    const payload = {
      id_responsavel: this.idUsuario, // O PHP vai salvar o ID de quem respondeu (pai ou prof)
      id_assistido: this.idAssistido,
      respostas: this.perguntas
    };

    this.http.post('http://localhost/TEA/backend/salvar_respostas_diarias.php', payload)
      .subscribe(
        async (res: any) => {
          if (res.success) {
            await this.mostrarAlerta('Sucesso', 'Relatório salvo com sucesso!');
            this.navCtrl.back();
          } else {
            this.mostrarAlerta('Erro', res.message || 'Erro ao salvar.');
          }
        },
        () => this.mostrarAlerta('Erro', 'Erro de conexão.')
      );
  }

  voltar() {
    this.navCtrl.back();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}