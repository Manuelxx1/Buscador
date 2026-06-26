import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id?: number;
  autor: string;
  contenido: string;
  fecha?: string;
  noticiaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  // Ajustá la URL si tu backend usa otro puerto o subruta en producción
  private apiUrl = 'http://localhost:8080/api/comentarios'; 

  constructor(private http: HttpClient) {}

  // Traer comentarios de una noticia
  getComentariosPorNoticia(noticiaId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/noticia/${noticiaId}`);
  }

  // Guardar un nuevo comentario
  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }
}
