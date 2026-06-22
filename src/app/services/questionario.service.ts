import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pergunta {
  id: number;
  texto: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {
  private backendUrl = 'http://localhost/api_questionario/';

  constructor(private http: HttpClient) { }

  verificarStatus(idUsuario: number): Observable<any> {
    return this.http.get(`${this.backendUrl}verificar_status.php?id_usuario=${idUsuario}`);
  }

  getPerguntas(): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.backendUrl}buscar_perguntas.php`);
  }

  enviarRespostas(idUsuario: number, respostas: any[]): Observable<any> {
    const payload = {
      id_usuario: idUsuario,
      respostas: respostas
    };
    return this.http.post(`${this.backendUrl}salvar_respostas.php`, payload);
  }
}