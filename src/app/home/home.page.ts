import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Importar o Router

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  // 2. Injetar o Router no construtor
  constructor(private router: Router) {}

  // 3. Criar a função que o HTML está chamando
  navigateTo(page: string) {
    this.router.navigate([page]);
  }

}