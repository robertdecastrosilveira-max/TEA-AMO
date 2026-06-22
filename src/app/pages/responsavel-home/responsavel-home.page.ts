import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-responsavel-home',
  templateUrl: './responsavel-home.page.html',
  styleUrls: ['./responsavel-home.page.scss'],
  standalone: false
})
export class ResponsavelHomePage implements OnInit {

  assistidos: any[] = [];
  isLoading = true;
  usuarioLogado: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
      this.usuarioLogado = JSON.parse(usuarioString);
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  ionViewDidEnter() {
    this.carregarAssistidos();
  }

  goTo(page: string) {
    this.navCtrl.navigateForward(page);
  }

  carregarAssistidos() {
  if (!this.usuarioLogado) return;

  this.isLoading = true;
  
  const id_responsavel = this.usuarioLogado.id;

  this.http.get<any[]>(`http://localhost/TEA/backend/buscar_meus_assistidos.php?id_responsavel=${id_responsavel}`)
    .subscribe(
      (data) => {
        this.assistidos = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar assistidos:', error);
        this.isLoading = false;
      }
    );
}
}