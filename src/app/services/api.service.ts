import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profissional } from 'src/app/models/profissional.model';
import { Responsavel } from 'src/app/models/responsavel.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/TEA/backend';

  constructor(private http: HttpClient) {}

  cadastrarProfissional(profissional: Profissional): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar.php`, profissional);
  }

  cadastrarResponsavel(responsavel: Responsavel): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar.php`, responsavel);
  }

  loginUsuario(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { email, senha });
  }
}