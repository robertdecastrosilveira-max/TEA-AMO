import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Social', url: '/social', icon: 'people' },
    { title: 'Login', url: '/menu-login', icon: 'log-in' },
    { title: 'Cadastrar', url: '/cadastro', icon: 'person-add' },
  ];

  constructor(private router: Router) {}


  logout() {
    localStorage.clear(); 
    this.router.navigate(['/home']);
  }
}