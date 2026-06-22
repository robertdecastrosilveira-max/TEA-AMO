import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina-medico',
  templateUrl: './pagina-medico.page.html',
  styleUrls: ['./pagina-medico.page.scss'],
  standalone: false
})
export class PaginaMedicoPage implements OnInit {

  pacientes: any[] = [];
  idProfissional: number = 0;
  usuarioLogado: any;
  isLoading: boolean = true; // Adicionado para controle de loading

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
      
      // Verificação de segurança opcional
      if (this.usuarioLogado.tipo !== 'profissional') {
          // Se não for médico, talvez redirecionar
      }
      
      this.carregarMeusPacientes();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ionViewDidEnter() {
    if (this.idProfissional > 0) {
        this.carregarMeusPacientes();
    }
  }

  carregarMeusPacientes() {
    this.isLoading = true;
    // Busca a lista de assistidos vinculados a este médico
    this.http.get<any[]>(`http://localhost/TEA/backend/buscar_meus_pacientes.php?id_profissional=${this.idProfissional}`)
      .subscribe(
        data => {
          this.pacientes = data;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao buscar pacientes:', error);
          this.isLoading = false;
        }
      );
  }

  async adicionarPaciente() {
    // Mostra um alerta com campo de texto para digitar o código
    const alert = await this.alertCtrl.create({
      header: 'Vincular Paciente',
      message: 'Digite o código de acesso fornecido pelo responsável:',
      inputs: [
        {
          name: 'codigo',
          type: 'text',
          placeholder: 'Ex: #A3F9'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Vincular',
          handler: (data) => {
            this.vincularPaciente(data.codigo);
          }
        }
      ]
    });
    await alert.present();
  }

  vincularPaciente(codigo: string) {
    if (!codigo) return;

    const payload = {
      id_profissional: this.idProfissional,
      codigo_acesso: codigo
    };

    this.http.post('http://localhost/TEA/backend/vincular_paciente.php', payload)
      .subscribe(
        async (res: any) => {
          if (res.success) {
            await this.mostrarAlerta('Sucesso', res.message);
            this.carregarMeusPacientes(); // Atualiza a lista
          } else {
            await this.mostrarAlerta('Erro', res.message);
          }
        },
        async (error) => {
          await this.mostrarAlerta('Erro', 'Falha ao conectar ao servidor.');
        }
      );
  }

  // Funções de Navegação
  
  goTo(page: string) {
    // Função genérica para os botões do menu (Sobre, Alerta, etc.)
    this.router.navigate([page]);
  }

  verFicha(idAssistido: number) {
    // O médico vê a mesma ficha que o responsável (apenas leitura se configurado assim)
    this.router.navigate(['/ficha-pessoal', idAssistido]);
  }
  
  verGraficos(idAssistido: number) {
    // O médico vê os gráficos de evolução
    this.router.navigate(['/grafico-evolucao', idAssistido]);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
  
  // Auxiliar para pegar iniciais
  getInitials(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
}