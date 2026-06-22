import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-assistidos',
  templateUrl: './cadastrar-assistidos.page.html',
  styleUrls: ['./cadastrar-assistidos.page.scss'],
  standalone: false,
})
export class CadastrarAssistidosPage implements OnInit {

  ficha = {
    id_responsavel: 0,
    nome_completo: '',
    data_nascimento: '',
    genero: '',
    grau_parentesco: '',
    informacoes_adicionais: ''
  };

  usuarioLogado: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
      this.ficha.id_responsavel = this.usuarioLogado.id;
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  setDataNascimento(event: any) {
    const dataDoPicker = event.detail.value;
    // Pequena proteção se o valor vier vazio
    if(dataDoPicker) {
        const dataFormatada = dataDoPicker.split('T')[0];
        this.ficha.data_nascimento = dataFormatada;
    }
  }

  async salvar() {
    if (!this.ficha.nome_completo || !this.ficha.data_nascimento || !this.ficha.grau_parentesco) {
      this.mostrarAlerta('Erro', 'Por favor, preencha os campos obrigatórios.');
      return;
    }

    this.http.post('http://localhost/TEA/backend/cadastrar_assistido.php', this.ficha)
      .subscribe(
        async (response: any) => {
          if (response.success) {
            await this.mostrarAlerta('Sucesso!', 'Assistido cadastrado.');
            this.navCtrl.back();
          } else {
            this.mostrarAlerta('Erro', response.message || 'Não foi possível cadastrar.');
          }
        },
        async (error: any) => {
          this.mostrarAlerta('Erro de Conexão', 'Não foi possível conectar ao servidor.');
        }
      );
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}