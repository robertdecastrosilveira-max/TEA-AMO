import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ficha-pessoal',
  templateUrl: './ficha-pessoal.page.html',
  styleUrls: ['./ficha-pessoal.page.scss'],
  standalone: false
})
export class FichaPessoalPage implements OnInit {

  assistidoId: number = 0;
  assistido: any = null;
  ficha: any[] = [];
  usuarioLogado: any = null;
  
  isLoading = true;
  modoEdicao = false;
  backupFicha: any[] = [];
  
  // Variáveis para Lógica de Profissional
  ehProfissional: boolean = false;
  idProfissionalLogado: number = 0;
  novaObservacao: string = '';
  historicoAnalises: any[] = [];
  mostrarFormAnalise: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.assistidoId = idParam ? +idParam : 0;

    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
        this.usuarioLogado = JSON.parse(usuarioString);
        this.ehProfissional = (this.usuarioLogado.tipo === 'profissional');
        if (this.ehProfissional) {
            this.idProfissionalLogado = this.usuarioLogado.id;
        }
    }

    if (this.assistidoId > 0) {
        // Carrega dados iniciais via ionViewDidEnter
    } else {
        this.navCtrl.navigateBack('/responsavel-home');
    }
  }

  ionViewDidEnter() {
    if (this.assistidoId > 0) {
       this.carregarDados();
       this.carregarHistoricoAnalises();
    }
  }

  carregarDados() {
    this.isLoading = true;

    // Busca
    const assistidoRequest = this.http.get(`http://localhost/TEA/backend/buscar_assistido.php?id=${this.assistidoId}`);
    // Busca Perguntas Sim/Não
    const fichaRequest = this.http.get<any[]>(`http://localhost/TEA/backend/buscar_ficha_pessoal.php?id_assistido=${this.assistidoId}`);

    forkJoin([assistidoRequest, fichaRequest]).subscribe(
      ([dataAssistido, dataFicha]) => {
        this.assistido = dataAssistido;

        this.ficha = dataFicha.map(item => {
          if (item.tipo_resposta === 'SimNao') {
            item.valor_resposta_bool = (item.valor_resposta === 'Sim');
          }
          return item;
        });

        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        this.mostrarAlerta('Erro', 'Não foi possível carregar os dados da ficha.');
        this.isLoading = false;
      }
    );
  }

  // Funções de Edição (Só para Responsável)

  ativarModoEdicao() {
    this.backupFicha = JSON.parse(JSON.stringify(this.ficha));
    this.modoEdicao = true;
  }

  cancelarEdicao() {
    this.ficha = this.backupFicha;
    this.modoEdicao = false;
  }

  async salvarAlteracoes() {
    const respostasParaSalvar = this.ficha.map(item => {
      let valorFinal = item.valor_resposta;
      if (item.tipo_resposta === 'SimNao') {
        valorFinal = item.valor_resposta_bool ? 'Sim' : 'Nao';
      }
      return { id: item.id, valor_resposta: valorFinal };
    });

    const payload = { id_assistido: this.assistidoId, respostas: respostasParaSalvar };

    this.http.post('http://localhost/TEA/backend/salvar_ficha_pessoal.php', payload)
      .subscribe(
        async (res: any) => {
            if(res.success) {
                await this.mostrarAlerta('Sucesso', 'Ficha salva.');
                this.modoEdicao = false;
            } else {
                this.mostrarAlerta('Erro', 'Erro ao salvar.');
            }
        }
      );
  }

  //Funções de Análise (Só para Profissional)

  carregarHistoricoAnalises() {
      this.http.get<any[]>(`http://localhost/TEA/backend/buscar_analises.php?id_assistido=${this.assistidoId}`)
        .subscribe(data => {
            this.historicoAnalises = data;
        });
  }

  salvarAnalise() {
      if (!this.novaObservacao.trim()) return;

      const payload = {
          id_profissional: this.idProfissionalLogado,
          id_assistido: this.assistidoId,
          observacao: this.novaObservacao
      };

      this.http.post('http://localhost/TEA/backend/salvar_analise_profissional.php', payload)
        .subscribe((res: any) => {
            if (res.success) {
                this.mostrarAlerta('Sucesso', 'Observação registrada!');
                this.novaObservacao = '';
                this.mostrarFormAnalise = false;
                this.carregarHistoricoAnalises();
            } else {
                this.mostrarAlerta('Erro', 'Falha ao salvar observação.');
            }
        });
  }

  // --- Utilitários ---

  getInitials(name: string): string {
      if (!name) return '';
      return name.charAt(0).toUpperCase();
  }

  irParaQuestionarioDiario() {
    this.router.navigate(['/questionario', this.assistidoId]);
  }

  irParaGraficoProcedimento() {
    this.router.navigate(['/grafico-evolucao', this.assistidoId]);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}