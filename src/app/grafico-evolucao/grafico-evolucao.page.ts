import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importante!
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-evolucao',
  templateUrl: './grafico-evolucao.page.html',
  styleUrls: ['./grafico-evolucao.page.scss'],
  standalone: false, // Mantendo compatível com seu projeto
})
export class GraficoEvolucaoPage implements OnInit, AfterViewInit {

  @ViewChild('graficoDiarioCanvas') private graficoDiarioCanvas!: ElementRef;
  @ViewChild('graficoMensalCanvas') private graficoMensalCanvas!: ElementRef;
  
  graficoDiario: any;
  graficoMensal: any;
  idAssistido: number = 0;
  
  // --- NOVAS VARIÁVEIS PARA OBSERVAÇÕES ---
  ehProfissional: boolean = false;
  idUsuarioLogado: number = 0;
  novaObservacao: string = '';
  historicoObservacoes: any[] = [];

  // Controle das abas
  tipoGrafico: string = 'diario'; 
  temDadosDiario: boolean = false;
  temDadosMensal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idAssistido = idParam ? +idParam : 0;

    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        this.idUsuarioLogado = usuario.id;
        // Se o tipo for 'profissional', libera a escrita
        this.ehProfissional = (usuario.tipo === 'profissional');
    }
  }

  ngAfterViewInit() {
    if (this.idAssistido > 0) {
      // Carrega tudo
      this.carregarGraficoDiario();
      this.carregarObservacoes(); // <-- Carrega o histórico aqui
    }
  }

  segmentChanged(event: any) {
    this.tipoGrafico = event.detail.value;
    if (this.tipoGrafico === 'diario') {
        setTimeout(() => this.carregarGraficoDiario(), 100);
    } else {
        setTimeout(() => this.carregarGraficoMensal(), 100);
    }
  }

  carregarGraficoDiario() {
    this.http.get<any[]>(`http://localhost/TEA/backend/buscar_dados_grafico.php?id_assistido=${this.idAssistido}`)
      .subscribe(dados => {
        if (!dados || dados.length === 0) {
            this.temDadosDiario = false; return;
        }
        this.temDadosDiario = true;
        const labels = dados.map(d => d.data_formatada);
        const valores = dados.map(d => d.total_pontos);
        this.criarGraficoDiario(labels, valores);
      });
  }

  criarGraficoDiario(labels: string[], data: number[]) {
    if (this.graficoDiario) this.graficoDiario.destroy();
    this.graficoDiario = new Chart(this.graficoDiarioCanvas.nativeElement, {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [{
          label: 'Evolução',
          data: data,
          borderColor: '#3880ff',
          backgroundColor: 'rgba(56, 128, 255, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
  }

  carregarGraficoMensal() {
     this.http.get<any[]>(`http://localhost/TEA/backend/buscar_dados_grafico_mensal.php?id_assistido=${this.idAssistido}`)
      .subscribe(dados => {
        if (!dados || dados.length === 0) {
            this.temDadosMensal = false; return;
        }
        this.temDadosMensal = true;
        const labels = dados.map(d => d.mes_ano);
        const valores = dados.map(d => d.media_pontos);
        this.criarGraficoMensal(labels, valores);
      });
  }

  criarGraficoMensal(labels: string[], data: number[]) {
    if (this.graficoMensal) this.graficoMensal.destroy();
    this.graficoMensal = new Chart(this.graficoMensalCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{ label: 'Média Mensal', data: data, backgroundColor: '#2dd36f', borderRadius: 5 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, suggestedMax: 10 } } }
    });
  }


  carregarObservacoes() {
    // Busca o histórico completo para este assistido
    this.http.get<any[]>(`http://localhost/TEA/backend/buscar_analises.php?id_assistido=${this.idAssistido}`)
      .subscribe(data => {
          this.historicoObservacoes = data;
      });
  }

  salvarObservacao() {
    if (!this.novaObservacao.trim()) return;

    const payload = {
        id_profissional: this.idUsuarioLogado,
        id_assistido: this.idAssistido,
        observacao: this.novaObservacao
    };

    this.http.post('http://localhost/TEA/backend/salvar_analise_profissional.php', payload)
      .subscribe(async (res: any) => {
          if (res.success) {
              this.novaObservacao = ''; // Limpa o campo
              this.carregarObservacoes(); // Atualiza a lista na hora
              const alert = await this.alertCtrl.create({ header: 'Sucesso', message: 'Análise registrada no prontuário.', buttons: ['OK'] });
              await alert.present();
          } else {
              const alert = await this.alertCtrl.create({ header: 'Erro', message: res.message || 'Falha ao salvar.', buttons: ['OK'] });
              await alert.present();
          }
      });
  }
}